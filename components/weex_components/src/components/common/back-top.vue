<!--回到顶部-->
<template>
    <image :src="backTopIcon" :style="topStyle" @click="backTop"></image>
</template>
<script>
    import weexUtils from "../utils/WeexUtils";
    import {dom} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";

    const defStyle = {
        right: "35px",
        bottom: "120px"
    }
    const hideStyle = {
        right: "-135px",
        bottom: "120px"
    }
    export default {
        props: {
            backTopIcon: {default: weexUtils.getResourcesURL("images/back_top_icon.png")},
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
                        // ...defStyle
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
                this.$emit("backTop");
            },
            change(contentOffset) {
                const {y} = contentOffset;
                if ((y + 100) < 0) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            }
        },
        beforeMount() {
            // this.backStyle = Object.assign(this.backStyle);
        }
    }
</script>
<style scoped></style>