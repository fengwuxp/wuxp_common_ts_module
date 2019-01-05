<!--圆角图片-->
<template>
    <div>
        <image v-if="!android"
               :src="src"
               @click="click"
               :style="style"></image>
        <!--CircleImage由安卓客户端实现-->
        <CircleImage v-if="android"
                     @click="click"
                     :src="src"
                     :radius="radius"
                     :style="style"></CircleImage>
    </div>
</template>
<script>
    export default {
        props: {
            src: {default: ""},
            width: {default: 0},
            imageStyle: {default: {}},
            radius: {default: null}
        },
        data() {
            const android = weex.config.env.platform.toLowerCase() === "android";
            return {
                android,
                style: {}
            }
        },
        methods: {
            click() {
                this.$emit("clickImage", this.src);
            }
        },
        mounted() {

        },
        beforeMount() {
            if (!this.radius) {
                this.radius = this.width;
            }
            this.radius = parseInt(this.radius);
            this.style = Object.assign(this.imageStyle, {
                width: this.width,
                height: this.width,
                borderRadius: this.radius
            });
        }
    }
</script>
