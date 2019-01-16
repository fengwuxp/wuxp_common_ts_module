<!--自定义图片组件-->
<!--android 原生通过filter层面支持圆角-->
<!--通过原生能力计算图片自适应宽高-->
<template>
    <image v-if="show"
           :src="src"
           ref="image"
           :resize="resize"
           @load="imageLoad"
           @click="onClick"
           :filter="filter"
           :style="pictureStyle"></image>
</template>
<script>

    import {isAndroid} from "common_weex/src/constant/WeexEnv";
    import ImageAutoSize from "./minxins/ImageAutoSize";
    import {weexTheme} from "../../theme/js_default_theme";

    export default {
        props: {
            src: {default: ""},
            width: {default: 0},
            maxWidth: {default: weexTheme["render-width"]},
            imageStyle: {default: {}},
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
                this.$emit("onClick", this.src);
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
                return {
                    ...this.imageStyle,
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    borderRadius: `${this.radius}px`
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
