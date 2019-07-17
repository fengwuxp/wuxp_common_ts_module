<!--自定义图片组件-->
<!--android 原生通过filter层面支持圆角-->
<!--通过原生能力计算图片自适应宽高-->
<template>
    <div :style="imageWrapperStyle" @click="onClick">
        <image v-if="show"
               :src="src"
               ref="image"
               :resize="resize"
               @load="imageLoad"
               :filter="filter"
               :style="pictureStyle"></image>
    </div>
</template>
<script>

    import {isAndroid} from "fengwuxp_common_weex/src/constant/WeexEnv";
    import ImageAutoSize from "./minxins/ImageAutoSize";
    import {weexTheme} from "../../theme/js_default_theme";
    import {ON_CLICK_EVENT_NAME} from "../../config/EventNamesConfig";

    export default {
        props: {
            src: {default: ""},
            width: {default: 0},
            maxWidth: {default: weexTheme["render-width"]},
            // imageStyle: {default: {}},
            wrapperStyle: {default: {}},
            radius: {default: null},
            resize: {
                default: "stretch"
            }
        },
        mixins: [ImageAutoSize],
        data() {
            return {
                filter: "",
                show: false
            }
        },
        methods: {
            onClick() {
                this.$emit(ON_CLICK_EVENT_NAME, this.src);
            },

            /**
             * 保存图片
             * @return Promise<void>
             */
            save() {
                const $ref = this.$refs["image"];
                if ($ref) {
                    return new Promise((relsove, reject) => {
                        $ref.save(({success, errorDesc}) => {
                            if (success) {
                                relsove();
                            } else {
                                reject(errorDesc);
                            }
                        });
                    });
                }

                return Promise.reject("");

            }
        },
        computed: {
            pictureStyle() {
                const {width, height, radius} = this;
                return {
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${radius}px`
                }
            },
            imageWrapperStyle() {
                const {width, height, radius} = this;
                return {
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${radius}px`,
                    ...this.wrapperStyle
                }
            }
        },
        mounted() {
            if (isAndroid) {
                this.$nextTick(() => {
                    this.filter = `blur(${this.radius})`;
                });
            }

        },
        beforeMount() {
            this.radius = parseInt(this.radius);
        }
    }
</script>
