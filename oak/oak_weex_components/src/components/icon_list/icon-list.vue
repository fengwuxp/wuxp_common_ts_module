<!--icon（栏目）列表-->
<template>
    <div class="icon-list-container" :style="containerStyle">
        <div class="icon-list-rows"
             v-for="(itemList,row) in list"
             :key="`${uiFloor.id}_${row}`">
            <div class="icon-item flex_center"
                 v-for="(item,i) in itemList"
                 :key="item.id"
                 :style="item.style"
                 @click="clickHandle(item)">
                <image @load="imageLoad"
                       class="icon-item-image"
                       :style="iconStyle"
                       :src="item.content"></image>
                <text class="icon-item-text"
                      :style="{width:item.style.width}" :value="item.name"></text>
            </div>
        </div>
    </div>
</template>
<script>
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";

    const defaultRowCount = 5;


    const borderStyle = {
        borderRightWidth: 1,
        borderRightColor: "#e6e6e6",
        borderRightStyle: "solid",
    };


    export default {
        mixins: [viewDataAnalysis],
        props: {
            imageStyle: {
                default: {
                    width: 100,
                    height: 100
                }
            }
        },
        data() {
            const iconStyle = this.imageStyle;
            return {
                list: [],
                containerStyle: {
                    paddingBottom: 10,
                    backgroundColor: "#ffffff"
                },
                iconStyle,
                count: 0,
                cellNum: defaultRowCount,
                imageWidth: 110
            }
        },
        methods: {
            updateStyle() {
                const list = [];
                const {cellNum, renderWidth, uiFloor, imageWidth} = this;
                const {showLine, cssStyle} = uiFloor;
                this.containerStyle = Object.assign(this.containerStyle, this.marginHandle, JSON.parse(cssStyle));
                const width = renderWidth / cellNum;
                this.items.forEach((item, i) => {
                    let number = i % cellNum;
                    let style = {};
                    if (number < cellNum - 1 && showLine) {
                        style = borderStyle;
                    }

                    item.style = {
                        width: `${width}px`,
                        minWidth: `${width}px`,
                        maxWidth: `${width}px`,
                        ...style
                    };

                    if (number === 0) {
                        list[list.length] = [];
                    }
                    let len = list.length - 1;
                    list[len][list[len].length] = item;
                });
                this.list = list;
                this.loadImageByNative(imageWidth || width);
            },
            resizeImage({reqWidth, reqHeight}) {
                if (this.count > 0) {
                    return
                }
                this.count++;
                let maxWidth = this.renderWidth / this.cellNum;
                let number = maxWidth * .7;
                if (reqWidth > number) {
                    //超过最大宽度的80%
                    reqHeight = reqHeight / (reqWidth / number);
                    reqWidth = number;
                }
                reqWidth = parseInt(reqWidth);
                this.iconStyle = {
                    width: reqWidth,
                    height: reqWidth
                }
            },
            imageLoad({success, size}) {
                if (!success) {
                    return;
                }
                const {naturalWidth, naturalHeight} = size;
                this.resizeImage({
                    reqWidth: naturalWidth,
                    reqHeight: naturalHeight
                })
            }
        },
        beforeMount() {
            const {renderWidth, items} = this;
            const {customProps} = this.uiFloor;
            const length = items.length;
            const {cellNum, iconWidth} = customProps ? JSON.parse(customProps) : {
                cellNum: length,
                iconWidth: renderWidth / length
            };
            this.cellNum = cellNum || defaultRowCount;
            this.imageWidth = iconWidth || this.imageWidth;
            this.updateStyle();
        }
    }
</script>

<style scoped>
    .flex_center {
        justify-content: center;
        align-items: center;
    }

    .icon-list-container {
        flex: 1;
    }

    .icon-list-rows {
        flex-direction: row;
        flex: 1;
        padding-top: 10px;
    }

    .icon-item {
        flex: 1;
        background-color: #ffffff;

    }

    .icon-item-image {
        margin-bottom: 10px;
    }

    .icon-item-text {
        text-align: center;
        color: #3c3c3c;
        font-size: 28px;
    }

</style>
