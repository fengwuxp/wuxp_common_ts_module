import {imageLoader} from "oak_weex_starter/src/ExpotrtWeexOAKModel";

export default {

    props: {
        height: {default: -1},     //期望高度
        proportion: {default: -1}, //默认图片比例 -1表示自适应
    },
    data() {
        return {

        };
    },
    methods: {
        /**
         * 设置图片大小
         * @param imageWidth
         * @param imageHeight
         */
        adjustSize({imageWidth, imageHeight}) {
            let autoWidth = this.height === -1;
            let autoHeight = this.width === -1;
            if (autoWidth && autoHeight) {
                //自适应
                if (imageWidth <= this.maxWidth) {
                    this.width = imageWidth;
                } else {
                    this.width = this.maxWidth;
                }
            }

            let width, height, proportion;
            if (autoWidth) {
                //指定高度，宽度自适应
                proportion = imageWidth / this.width;
                width = this.width;
                height = imageHeight / proportion;
            } else if (autoHeight) {
                //指定宽度 高度自适应
                proportion = imageHeight / this.height;
                height = this.height;
                height = imageWidth / proportion;
            }

            if (!autoHeight && !autoWidth) {
                //强行指定高度
                width = this.width;
                height = this.height;
            }

            let maxHeight = this.maxHeight;
            if (maxHeight !== -1 && height > maxHeight) {
                //超过最大高度限制
                //重新计算
                proportion = height / maxHeight;
                width = width / proportion;
                height = maxHeight;
            }

            this.$nextTick(() => {
                this.width = width;
                this.height = height;
                this.$emit("onLoad", {
                    width,
                    height
                });
            })

        },

        /**
         * 图片加载
         * @param size
         * @param success
         */
        imageLoad({size, success}) {
            const {
                naturalWidth,
                naturalHeight
            } = size;

            const imageWidth = parseInt(naturalWidth);
            const imageHeight = parseInt(naturalHeight);

            if (imageWidth <= 0 || imageHeight <= 0 - 1) {
                return;
            }
            this.setSize({
                imageWidth,
                imageHeight
            });
        }
    },
    beforeMount() {

        this.width = parseInt(this.width);
        if (this.height === -1) {
            //没有设置高度的话默认和宽度一直
            this.height = this.width;
        }
        this.height = parseInt(this.height);
        imageLoader.loadImageInfo(this.src, this.width === -1 ? this.maxWidth : this.width,
            (map) => {
                const {reqWidth, reqHeight} = map;
                this.adjustSize({
                    imageWidth: reqWidth,
                    imageHeight: reqHeight
                });
                console.log("获取图片高度!-> " + JSON.stringify(map));
            }, (msg) => {
                console.log("获取图片高度失败!-> " + msg);
            });

    }
}