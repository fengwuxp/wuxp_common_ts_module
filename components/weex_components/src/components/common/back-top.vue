<!--回到顶部-->
<template>
    <image :src="backTopIcon" :style="topStyle" @click="backTop"></image>
</template>
<script>
    import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";
    import {dom} from "common_weex/src/sdk/ExportWeexSdkModule";

    const defStyle = {
        right: "35px",
        bottom: "120px"
    };
    const hideStyle = {
        right: "-135px",
        bottom: "120px"
    };

    export default {
        props: {
            backTopIcon: {default: getWeexResourceUrl("back_top_icon.png")},
            backStyle: {
                default: {
                    width: "80px",
                    height: "80px",
                    position: "fixed",
                    ...defStyle
                }
            }
        },
        data() {
            return {
                show: false
            }
        },
        computed: {
            topStyle() {
                if (this.show) {
                    return {
                        ...this.backStyle,
                    }
                } else {
                    return {
                        ...this.backStyle,
                        ...hideStyle
                    }
                }
            }
        },
        methods: {
            backTop() {
                this.$emit("onBackTop");
            },
            tryChangeStatus(contentOffset) {
                const {y} = contentOffset;
                if ((y + 100) < 0) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            }
        },
        beforeMount() {

        }
    }
</script>
<style scoped></style>