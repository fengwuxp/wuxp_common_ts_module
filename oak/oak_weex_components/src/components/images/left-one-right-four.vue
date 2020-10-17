<template>
    <div class="flex_row" :style="containerStyle">
        <image class="flex_cell"
               :src="images.left[0].content"
               :style="images.left[0].style"
               @click="clickHandle(images.left[0])"
        ></image>
        <v-line v-if="imageHeight" :height="imageHeight"></v-line>
        <div class="flex_cell">
            <template v-for="(item,i) in images.center">
                <image :key="item.id"
                       :src="item.content"
                       :style="item.style"
                       @click="clickHandle(item)"
                ></image>
                <h-line :key="item.id" :width="item.style.width"></h-line>
            </template>
        </div>
        <v-line v-if="imageHeight" :height="imageHeight"></v-line>
        <div class="flex_cell">
            <template v-for="(item,i) in images.center">
                <image :key="item.id"
                       :src="item.content"
                       :style="item.style"
                       @click="clickHandle(item)"
                ></image>
                <h-line :key="item.id" :width="item.style.width"></h-line>
            </template>
        </div>
    </div>
</template>
<script>
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";

    export default {
        mixins: [viewDataAnalysis],
        data() {
            return {
                images: {
                    left: [],
                    center: [],
                    right: []
                },
                imageHeight: null,
                containerStyle: {}
            };
        },
        methods: {
            setStyle(reqWidth = 250, reqHeight = 360) {
                const {showLine} = this.uiFloor;
                if (showLine) {
                    reqWidth -= 1;
                    reqHeight -= 2;
                    //分割线
                    this.imageHeight = reqHeight;
                }
                this.containerStyle = Object.assign(this.containerStyle, this.marginHandle);
                this.images.left = [Object.assign(this.items[0], {
                    style: {
                        height: (reqHeight + 1) + "px",
                        width: reqWidth + "px"
                    }
                })];

                let style = {
                    height: reqHeight / 2 + "px",
                    width: reqWidth + "px",
                    backgroundColor: "#ffffff;"
                };

                this.images.center = [
                    Object.assign(this.items[1], {style}),
                    Object.assign(this.items[2], {style})
                ];
                this.images.right = [
                    Object.assign(this.items[3], {style}),
                    Object.assign(this.items[4], {style})
                ];
            },
            resizeImage(reqWidth = 250, reqHeight = 36) {
                this.setStyle(reqWidth, reqHeight);
            },
            updateStyle() {
                let width = this.renderWidth / 3;
                if (this.web) {
                    this.setStyle(width, 360);
                    return;
                }
                this.loadImageByNative(width);
            }
        },
        beforeMount() {
            this.updateStyle();
        }
    }

</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .flex_cell {
        flex: 1;
    }
</style>
