<!--自定义图片组件-->
<!--android 原生通过filter层面支持圆角-->
<!--通过原生能力计算图片自适应宽高-->
<template>
    <image v-if="show"
           :src="src"
           :resize="resize"
           @click="click"
           :filter="filter"
           :style="pictureStyle"></image>
</template>
<script>

    import {isAndroid} from "common_weex/src/constant/WeexEnv";
    import ImageAutoSize from "./ImageAutoSize";

    export default {
        props: {
            src: {default: ""},
            width: {default: 0},
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
            click() {
                this.$emit("onClick", this.src);
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
