<!--圆角图片-->
<template>
    <image :src="src"
           @click="click"
           :filter="filter"
           :style="style"></image>
</template>
<script>

    // import {isAndroid} from "common_weex/src/constant/WeexEnv";

    export default {
        props: {
            src: {default: ""},
            width: {default: 0},
            imageStyle: {default: {}},
            radius: {default: null}
        },
        data() {
            return {
                style: {},
                filter: ""
            }
        },
        methods: {
            click() {
                this.$emit("clickImage", this.src);
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.filter = `blur(${this.radius})`;
            })
        },
        beforeMount() {
            this.radius = parseInt(this.radius);
            this.style = Object.assign(this.imageStyle, {
                width: this.width,
                height: this.width,
                borderRadius: this.radius
            });
        }
    }
</script>
