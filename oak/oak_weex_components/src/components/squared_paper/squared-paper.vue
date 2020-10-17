<!--九宫格-->
<template>
    <div class="icon-list-container"
         :style="containerStyle">
        <div class="icon-list-rows"
             v-for="(itemList,row) in list"
             :key="row">
            <div class="icon-item flex_center"
                 v-for="(item,i) in itemList"
                 :key="item.id"
                 :style="item.style"
                 @click="clickHandle(item)">
                <image v-if="item.content"
                       @load="imageLoad"
                       class="icon-item-image"
                       :style="iconStyle"
                       :src="item.content"></image>
                <text class="icon-item-text"
                      :style="{width:item.style.width}"
                      :value="item.name"></text>
            </div>
        </div>
    </div>
</template>
<script>
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";

    const defaultRowCount = 4;

    //图片宽度被调整的次数

    const borderStyle = {
        borderRightWidth: 1,
        borderRightColor: "#e6e6e6",
        borderRightStyle: "solid"
    };

    export default {
        mixins: [viewDataAnalysis],
        data() {
            return {
                list: [],
                containerStyle: {},
                iconStyle: {},
                resizeImageCount: 0
            }
        },
        methods: {
            updateStyle() {
                const list = [];
                // const {showLine} = this.uiFloor;
                this.containerStyle = Object.assign(this.containerStyle, this.marginHandle);
                const width = this.renderWidth / defaultRowCount;
                this.items.forEach((item, i) => {
                    //改组件默认使用分割线
                    let style = {};
                    let number = i % defaultRowCount;
                    if (number < defaultRowCount - 1) {
                        style = borderStyle;
                    }
                    item.style = {
                        width,
                        height: width,
                        ...style
                    };

                    if (number === 0) {
                        list[list.length] = [];
                    }
                    let len = list.length - 1;
                    list[len][list[len].length] = item;
                });

                //补全
                const items = list[list.length - 1];
                let length = items.length;
                if (length < defaultRowCount) {
                    for (let i = 0; i < defaultRowCount - length; i++) {
                        let item = {};
                        let style = {};
                        if (i < defaultRowCount - 1) {
                            style = borderStyle;
                        }
                        item.style = {
                            width,
                            height: width,
                            ...style
                        };
                        items.push(item);
                    }
                    console.log("---------items--->", items.length)
                }

                this.list = list;
                this.loadImageByNative(width);
            },
            resizeImage({reqWidth, reqHeight}) {
                if (this.resizeImageCount > 0) {
                    return
                }
                this.resizeImageCount++;
                // let maxWidth = this.renderWidth / defaultRowCount;
                // let number = maxWidth * .7;
                // if (reqWidth > number) {
                //     //超过最大宽度的80%
                //     reqHeight = reqHeight / (reqWidth / number);
                //     reqWidth = number;
                // }
                // this.iconStyle = {
                //     width: reqWidth,
                //     height: reqHeight
                // }
                this.iconStyle = {
                    width: 80,
                    height: 80
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
    }

    .icon-item {
        background-color: #ffffff;
        border-bottom-color: #e6e6e6;
        border-bottom-width: 1px;
    }

    .icon-item-image {
        margin-bottom: 10px;
    }

    .icon-item-text {
        text-align: center;
        color: #3c3c3c;
        font-size: 24px;
    }

</style>
