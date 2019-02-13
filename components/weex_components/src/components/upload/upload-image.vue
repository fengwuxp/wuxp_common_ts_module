<!--图片上传-->
<template>
    <div class="flex_1"
         :style="uploadStyle"
         @click="onClick">
        <!--初始占位组件-->

        <div v-if="uploadStep===0" class="flex_1">
            <slot v-if="!uploadPlaceholderIcon" name="placeholder"></slot>
            <weex-image v-if="uploadPlaceholderIcon"
                        @onClick="onClick"
                        class="flex_1"
                        :radius="radius"
                        :width="width"
                        :height="height"
                        :src="uploadPlaceholderIcon"></weex-image>
            <!--web端使用表单-->
            <label v-if="isWeb"
                   :for="`upload_web`"
                   class="input_file">
                <input v-if="changeCount%2===0"
                       type="file"
                       :key="changeCount"
                       :id="`upload_web`"
                       style="display: none"
                       :multiline="selectedMaxNum>1"
                       @change="onChooseFile"
                       accept="image/*"/>
                <input v-if="changeCount%2===1"
                       type="file"
                       :key="changeCount"
                       :id="`upload_web`"
                       style="display: none"
                       :multiline="selectedMaxNum>1"
                       @change="onChooseFile"
                       accept="image/*"/>
            </label>
        </div>


        <!--上传中-->
        <div v-if="uploadStep===1 && maskText"
             :style="Object.assign({},this.uploadStyle)"
             class="mask_text flex_1">
            <text :style="maskTextStyle" :value="maskText"></text>
        </div>
        <!--上传成功-->
        <weex-image v-if="uploadStep===2"
                    class="flex_1"
                    :radius="radius"
                    :width="width"
                    :height="height"
                    :src="uploadResult"></weex-image>
    </div>
</template>

<script>
    import WeexImage from "../picture/weex-image";
    import {weexToast} from "common_weex/src/toast/WeexToast";
    import {isIos, isWeb} from "common_weex/src/constant/WeexEnv";
    import UploadHandleByNative from "./UploadHandleByNative";
    import UploadHandleByWeb from "./UploadHandleByWeb";

    const uploadHandle = isWeb ? UploadHandleByWeb : UploadHandleByNative;

    export default {
        name: "upload-image",
        components: {WeexImage},
        props: {
            //上传组件的宽高
            width: {
                default: null
            },
            height: {
                default: null
            },

            /**
             * 上传处理函数
             **/
            uploadHandle: {
                default: null
            },

            //上传的提示图片
            uploadPlaceholderIcon: {
                type: String,
                default: ""
            },

            //上传的文件类型
            accept: {
                type: String,
                default: "*",
            },
            //可以选择的最大的图片数量
            selectedMaxNum: {
                type: Number,
                default: 1
            },
            //序号，用于在回调中判断图片
            orderNumber: {
                type: Number,
                default: 0
            },
            //裁图比例
            proportion: {
                type: Array,
                default: [1, 1]
            },

            //是否裁图
            crop: {
                default: true
            },

            //圆角大小
            radius: {
                default: 0
            },
            maskText: {
                default: "图片上传中..."
            },
            maskStyle: {
                default: {
                    backgroundColor: "rgba(0,0,0,.4)"
                }
            },
            maskTextStyle: {
                default: {
                    color: "#ffffff",
                    fontSize: 30
                }
            },

            /**
             * 压缩大小
             * 1：    表示不压缩
             * 0-1： 表示压缩比例
             * 大于1：表示期望图片的最大尺寸
             **/
            compressionSize: {
                default: true
            }

        },
        mixins: [uploadHandle],
        data() {
            return {

                /**
                 * 上传步骤
                 * 0：初始状态
                 * 1：上传中，
                 * 2：上传成功
                 * 如果上传失败则回到步骤1
                 * 上传成功则回到步骤0
                 */
                uploadStep: 0,
                uploadResult: "",
                isWeb

            }
        },
        computed: {
            uploadStyle() {
                return {
                    // width: `${this.width}px`,
                    // height: `${this.height}px`
                }
            }
        },
        methods: {
            onClick(event) {
                if (isWeb) {
                    return;
                }
                this.openChoosePlan();
            },

            /**
             * 处理图片上传
             * @param base64DataList 要上传的base64图片数据
             **/
            handleUpload(base64DataList) {

                //使用默认的上传处理
                let uploadHandle = this.uploadFile;
                if (typeof this.uploadHandle === "function") {
                    //使用自定义的上传处理
                    uploadHandle = this.uploadHandle;
                }
                if (uploadHandle == null) {
                    throw new Error("upload handle is null");
                }

                Promise.all(base64DataList.map((data, index) => this.uploadHandle(data, index)))
                    .then((resultList) => {
                        //上传结果是一个数组
                        // [{url:"http://xxx",orderIndex:1}]
                        this.$emit("onUploadSuccess", resultList);
                    }).catch((e) => {
                    console.error("上传文件失败", e);
                    this.uploadStep = 0;
                });
            },

        },
        beforeMount() {
            const uploadHandle = this.uploadHandle;
            if (uploadHandle) {
                this.uploadHandle = () => {
                    return uploadHandle().then((url) => {
                        //统一响应
                        return {
                            orderIndex: this.orderIndex,
                            url
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/flex";

    .mask_text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, .1);
    }

    .input_file {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
    }
</style>