<!--多行，多列图片适配-->
<template>
    <div :style="containerStyle">
        <!--一行-->
        <template v-for="(item,row) in items"
                  v-if="row % columns === 0">
            <h-line v-if="isOneRow(row) && showLine"
                    :width="renderWidth"
                    :backgroundColor="renderBorderColor"></h-line>
            <div :key="row"
                 :style="rowStyle"
                 class="flex_row">
                <!--一列-->
                <template v-for="index in columns">
                    <image v-if="imageWidth!==null"
                           :key="getIndex(row,index).id"
                           class="flex_cell"
                           :style="{width:imageWidth,height:rowStyle.height}"
                           :src="getIndex(row,index).content"
                           @click="clickHandle(getIndex(row,index))"
                    ></image>
                    <!--边线-->
                    <v-line v-if="index < columns && showLine"
                            :key="index"
                            :height="rowStyle.height"
                            :backgroundColor="renderBorderColor"></v-line>
                </template>
            </div>
        </template>
        <h-line v-if="showLine"
                :width="renderWidth"
                :backgroundColor="renderBorderColor"></h-line>
    </div>
</template>
<script>
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";

    const TYPE_LIST = {
        THE_ONE_COLUMN: {
            columns: 1,
            rows: 1
        },
        THE_TWO_COLUMN: {
            columns: 2,
            rows: 1
        },
        THE_THREE_COLUMN: {
            columns: 3,
            rows: 1
        },
        THE_FOUR_COLUMN: {
            columns: 4,
            rows: 1
        },

        TWO_ROW_TWO_COLUMN: {
            columns: 2,
            rows: 2
        },
        INDEFINITE_TERM_GOODS: {
            columns: 2,
            rows: 2
        }
    };

    const calculationWidth = (width, columns) => {

        return (width - columns) / columns;
    };

    export default {
        mixins: [viewDataAnalysis],
        data() {
            // 分割线
            const {showLine} = this.uiFloor;
            return {
                containerStyle: {
                    width: this.renderWidth
                },
                columns: -1,
                imageWidth: null,
                rowStyle: {},
                showLine
            }
        },
        methods: {
            setStyle(reqWidth, reqHeight, columns) {
                this.imageWidth = reqWidth;

                this.containerStyle = Object.assign(this.containerStyle, this.marginHandle);
                reqWidth = calculationWidth(this.renderWidth, columns);
                this.rowStyle = {
                    height: reqHeight,
                    width: this.renderWidth,
                    backgroundColor: this.renderBackgroundColor
                }
            },
            resizeImage({reqWidth, reqHeight}) {
                const {componentType} = this.uiFloor;
                const {columns} = TYPE_LIST[componentType];
                this.setStyle(reqWidth, reqHeight, columns);
            },
            updateStyle() {
                const {componentType} = this.uiFloor;
                let type = TYPE_LIST[componentType];
                if (type === undefined) {
                    return;
                }
                const {columns} = type;
                this.columns = columns;
                let width = calculationWidth(this.renderWidth, columns);
                if (this.useImageLoad) {
                    if (this.web) {
                        this.setStyle(width, 360, columns);
                    } else {
                        this.loadImageByNative(width);
                    }
                } else {
                    this.resizeImage({
                        reqWidth: width,
                        reqHeight: this.floorHeight
                    });
                }
            },
            getIndex(row, index) {
                let number = row + index - 1;
                return this.items[number] || {};
            },
            isOneRow(index) {
                let row = Math.floor(index / this.columns);
                return row >= 1;
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
</style>
