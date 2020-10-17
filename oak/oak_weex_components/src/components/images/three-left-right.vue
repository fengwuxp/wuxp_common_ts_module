<template>
    <div :style="containerStyle">
        <div class="flex_row">
            <div class="flex_center">
                <template v-for="(item,i) in leftImages">
                    <!--ios 图片不支持padding样式所以使用一个div包裹-->
                    <div class="flex_center" :style="leftImageStyle[i]" :key="item.id">
                        <image :src="item.content"
                               :style="getImageStyle(leftImageStyle[i])"
                               @click="clickHandle(item)"
                        ></image>
                    </div>
                    <h-line :width="lineHStyle.width"
                            :backgroundColor="lineHStyle.backgroundColor"
                            v-if="lineHStyle !==null && leftImages.length===2 && i===0"></h-line>
                </template>
            </div>
            <v-line :height="lineVStyle.height"
                    :backgroundColor="lineVStyle.backgroundColor"
                    v-if="lineVStyle!==null"></v-line>
            <div class="flex_center">
                <template v-for="(item,i) in rightImages">
                    <div class="flex_center"
                         :style="rightImageStyle[i]"
                         :key="item.id">
                        <image :src="item.content"
                               :style="getImageStyle(rightImageStyle[i])"
                               @click="clickHandle(item)"
                        ></image>
                    </div>
                    <h-line :width="lineHCStyle.width"
                            :backgroundColor="lineHCStyle.backgroundColor"
                            :style="lineHStyle"
                            v-if="lineHStyle && rightImages.length===2 && i===0"></h-line>
                </template>
            </div>
        </div>
        <h-line :width="lineHCStyle.width"
                :backgroundColor="lineHCStyle.backgroundColor"
                v-if="lineHCStyle!==null"></h-line>
    </div>
</template>
<script>
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";
    import {imageLoader} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";

    /**
     * 图片样式计算次数标记位
     * @type {number}
     */
    let CALCULATION_COUNT = 0;

    export default {
        mixins: [viewDataAnalysis],
        data() {
            const containerStyle = {
                backgroundColor: this.renderBackgroundColor
            };
            return {
                leftImages: [],
                rightImages: [],
                leftImageStyle: [],
                rightImageStyle: [],
                containerStyle,
                lineHStyle: null,
                lineVStyle: null,
                lineHCStyle: null,
                // leftWidth: this.renderWidth / 2
            };
        },
        methods: {
            setStyle(leftWidth, reqHeight) {
                const {showLine} = this.uiFloor;
                let width;
                if (showLine) {
                    width = leftWidth - 1;
                }
                this.divideLeftRight(leftWidth, reqHeight, showLine);

                if (showLine) {
                    //分割线
                    this.lineHStyle = {
                        width,
                        height: 1,
                        backgroundColor: this.renderBorderColor
                    };
                    this.lineHCStyle = {
                        width: this.renderWidth,
                        height: 1,
                        backgroundColor: this.renderBorderColor
                    };
                    this.lineVStyle = {
                        width: 1,
                        height: reqHeight,
                        backgroundColor: this.renderBorderColor
                    };
                }
                this.containerStyle = Object.assign(this.containerStyle, this.marginHandle);

            },
            /**
             * 计算2张图片的宽高
             */
            calculationTowStyle(src, leftWidth, leftHeight, callback) {
                const width = this.renderWidth - leftWidth;
                const height = (leftHeight - 1) / 2;
                const style = {
                    height,
                    width,
                    backgroundColor: this.renderBackgroundColor
                };
                if (this.web) {
                    CALCULATION_COUNT++;
                    callback(style);
                } else {
                    imageLoader.loadImageInfo(src, width, ({reqHeight, reqWidth}) => {
                        const paddingTop = ((height - reqHeight) / 2) || 0;
                        //使用padding 来保证图片居中并且保持原始比例
                        CALCULATION_COUNT++;
                        callback({
                            ...style,
                            paddingTop,
                            paddingBottom: paddingTop
                        });
                    });
                }

            },

            divideLeftRight(leftWidth, reqHeight) {
                const {componentType} = this.uiFloor;

                const isLeft = componentType === "LEFT_ONE_RIGHT_TWO";

                const bigImageStyle = {
                    height: reqHeight,
                    width: leftWidth
                };
                const list = [this.items[1], this.items[2]];


                const width = this.renderWidth - leftWidth;
                const height = (reqHeight - 1) / 2;
                const smallStyle = {
                    height,
                    width,
                    backgroundColor: this.renderBackgroundColor
                };
                //防止在原生下 有属性会诡异丢失，用另外一个数组保存一下
                const imageStyleList = [
                    smallStyle,
                    smallStyle
                ];
                if (isLeft) {
                    //左一右二
                    //第一张都是大图
                    this.leftImages = [this.items[0]];
                    this.leftImageStyle[0] = bigImageStyle;
                    this.rightImages = list;
                    this.rightImageStyle = imageStyleList;
                } else {
                    //左二右一
                    this.leftImages = list;
                    this.leftImageStyle[0] = imageStyleList;

                    //第一张都是大图
                    this.rightImages = [this.items[0]];
                    this.rightImageStyle[0] = bigImageStyle;
                }

                // list.forEach((item) => {
                //
                //     console.log(`--imageStyleList-> ${JSON.stringify(imageStyleList)} ${JSON.stringify(bigImageStyle)}`);
                //
                //     this.calculationTowStyle(item.content, leftWidth, reqHeight, (imageStyle) => {
                //         imageStyleList.push(imageStyle);
                //         if (CALCULATION_COUNT % 2 !== 0) {
                //             return;
                //         }
                //         // console.log(`--imageStyleList-> ${JSON.stringify(imageStyleList)} ${JSON.stringify(bigImageStyle)}`);
                //         if (isLeft) {
                //             //左一右二
                //             //第一张都是大图
                //             this.leftImages = [this.items[0]];
                //             this.leftImageStyle[0] = bigImageStyle;
                //             this.rightImages = list;
                //             this.rightImageStyle = imageStyleList;
                //         } else {
                //             //左二右一
                //             this.leftImages = list;
                //             this.leftImageStyle[0] = imageStyleList;
                //
                //             //第一张都是大图
                //             this.rightImages = [this.items[0]];
                //             this.rightImageStyle[0] = bigImageStyle;
                //         }
                //     });
                // })

            },
            /**
             * 获取图片样式
             */
            getImageStyle({width, height, paddingTop = 0, paddingBottom = 0}) {
                height -= paddingBottom + paddingTop;
                return {
                    width,
                    height
                }
            },
            resizeImage({reqWidth, reqHeight}) {
                // reqWidth = this.realPxConvertRenderPx(reqWidth);
                // reqHeight = this.realPxConvertRenderPx(reqHeight);
                // this.leftWidth = reqWidth;
                this.setStyle(reqWidth, reqHeight);
            },
            updateStyle() {

                //重置图片样式计算标记
                const width = this.renderWidth / 2;
                if (this.useImageLoad) {
                    if (this.web) {
                        this.setStyle(width, this.floorHeight > 0 ? this.this.floorHeight : 360);
                    } else {
                        this.loadImageByNative(-1);
                    }

                } else {
                    this.resizeImage({
                        reqWidth: width,
                        reqHeight: this.floorHeight
                    });
                }

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

    .flex_center {
        justify-content: center;
        align-items: center;
    }
</style>
