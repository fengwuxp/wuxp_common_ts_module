<!--文本标题-->
<template>
    <div v-if="items[0]!=null">
        <image v-if="!hasTitle"
               :style="style"
               :src="items[0].content"
               @click="clickHandle(items[0])"></image>
        <div v-if="hasTitle"
             @click="clickHandle(items[0])"
             class="flex_row">
            <image v-if="items[0].content"
                   style="width: 30px;height: 30px"
                   :src="items[0].content"></image>
            <text :style="titleStyle"
                  :value="items[0].name"></text>
        </div>
    </div>
</template>
<script>
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";

    const defaultStyle = {
        fontSize: 32,
        color: "#999999",
        // marginLeft: 30
    };
    export default {
        mixins: [viewDataAnalysis],
        props: {},
        data() {
            return {
                style: {}
            }
        },
        computed: {
            hasTitle() {

                return this.items[0].name != null;
            },
            titleStyle() {
                let style = this.uiFloor.cssStyle;
                if (style == null || style === "") {
                    return defaultStyle
                }
                return {
                    ...defaultStyle,
                    ...JSON.parse(style)
                }
            }
        },
        methods: {
            resizeImage({reqWidth, reqHeight}) {
                this.style = Object.assign(this.style, {
                    width: reqWidth,
                    height: reqHeight
                }, this.marginHandle);
            },
            updateStyle() {

                if (this.web) {
                    this.resizeImage({reqWidth: this.renderWidth, reqHeight: 88});
                } else {
                    this.loadImageByNative(this.renderWidth);
                }
            }
        },
        beforeMount() {
            console.log("------title----->",this.items)
            this.updateStyle();
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 30px;
    }
</style>
