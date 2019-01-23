<!--图片上传-->
<template>
    <div class="flex_1"
         :style="uploadStyle"
         @click="onClick">
        <!--初始占位组件-->
        <slot v-if="uploadStep===0" name="placeholder"></slot>
        <weex-image v-if="uploadStep===0 && uploadPlaceholderIcon"
                    @onClick="onClick"
                    class="flex_1"
                    :radius="radius"
                    :width="width"
                    :height="height"
                    :src="uploadPlaceholderIcon"></weex-image>

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


    const photo = weex.requireModule('photo');
    const appMain = weex.requireModule("appMain");

    const actionSheet = weex.requireModule('actionSheet');
    const nat_network_transfer = weex.requireModule('nat_network_transfer');

    const ACTION_SHEET_LIST = [
        {'type': 0, 'message': '拍照'},
        {'type': 0, 'message': '从相册取'},
        {'type': 1, 'message': '取消'}
    ];

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
            }

        },
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
                uploadResult: ""
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

            /**
             * 选择图片
             **/
            chooseImage() {
                if (this.uploadStep !== 0) {
                    return;
                }
                //在原生环境下先选择图片
                //http://natjs.com/#/reference/media/image
                actionSheet.create({
                    items: ACTION_SHEET_LIST,
                    title: '提示',
                    message: '请选择'
                }, (ret) => {
                    const result = ret.result;
                    if (result !== 'success') {
                        console.log("图片选择或拍照失败");
                        return;
                    }
                    const {message, index} = ret.data;
                    if (index > 1) {
                        console.log("取消");
                        return;
                    }
                    const proportion = {};
                    if (this.proportion.length === 0) {
                        //表示不限制
                    } else {
                        //ios 支持 1：1   4：3   16：9
                        proportion.aspectX = this.proportion[0];
                        proportion.aspectY = this.proportion[1]
                    }
                    const {aspectX, aspectY} = proportion;
                    photo.capture(this.booleanConvert(index === 0),
                        this.booleanConvert(this.crop),
                        {
                            aspectX: aspectX,
                            aspectY: aspectY,
                            requireBase64: typeof this.handleUpload === "function"
                        }, (data) => {
                            if (data === undefined || data === null) {
                                weexToast("图片选择出现异常");
                                return;
                            }
                            if (data.toString().toLowerCase().indexOf("p:") === 0) {
                                //表示进度信息
                                appMain.showProgressBar(20);
                                return;
                            }
                            this.handleUpload(data);

                        }, (message) => {
                            weexToast(message);
                        });
                });
            },

            /**
             * 针对Ios下boolean转换失败的处理 返回0 或 1
             * @param flag
             * @return {*}
             */
            booleanConvert(flag) {
                if (isIos) {
                    return flag;
                }
                return flag ? 1 : 0;
            },


            onClick(event) {
                if (isWeb) {
                    console.log("web端暂不支持该组件");
                    return;
                }
                this.chooseImage();
            },


            /**
             * 处理图片上传
             **/
            handleUpload(data) {
                if (this.uploadHandle) {
                    //使用自定义的上传处理
                    //TODO 转为base64字符串
                    this.uploadHandle(data).then(() => {
                        this.$emit("onUploadSuccess");
                    }).then(() => {
                        this.uploadStep = 0;
                    });
                } else {
                    //使用默认的原生自动上传
                    appMain.hideProgressBar();
                    this.defaultUploadByNative(data);
                }
            },

            /**
             * 基于原生的自动上传图片
             * @param filePath
             */
            defaultUploadByNative(filePath) {

                appMain.showProgressBar(20);
                this.uploadStep = 1;
                nat_network_transfer.upload({
                    url: process.env.PIC_SERVICE_URL,
                    path: filePath
                }, (result) => {
                    const {data, ok, progress} = result;
                    if (progress) {
                        console.log("上传中!");
                        return;
                    }
                    appMain.hideProgressBar();
                    if (!ok) {
                        this.uploadStep = 0;
                        console.log("上传失败!");
                        return;
                    }
                    if (data == null) {
                        console.log("上传无结果!");
                        return;
                    }
                    this.uploadStep = 2;
                    const resp = JSON.parse(data);
                    const {url} = resp;
                    result = {
                        orderNumber: this.orderNumber,
                        url: process.env.PIC_SERVICE_DOMAIN + url
                    };
                    this.$emit("onUploadSuccess", {
                        result
                    });
                    this.uploadStep = 0;
                });
            },
        },
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
</style>