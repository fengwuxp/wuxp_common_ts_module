import {imageLoader} from "oak_weex_starter/src/ExpotrtWeexOAKModel";
import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";

export default {

    props: {
        height: {default: 0},     //期望高度
        proportion: {default: 0}, //默认图片比例 0表示自适应
    },
    data() {
        return {};
    },
    computed: {
        needLoadSize() {
            return this.height === 0 && !isWeb;
        }
    },
    methods: {
        /**
         * 设置图片大小
         * @param imageWidth
         * @param imageHeight
         */
        adjustSize({imageWidth, imageHeight}) {
            let autoWidth = this.height === 0;
            let autoHeight = this.width === 0;
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
            if (maxHeight !== 0 && height > maxHeight) {
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
            });
            this.show = true;

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
            this.adjustSize({
                imageWidth,
                imageHeight
            });
        },

    },
    beforeMount() {

        this.width = parseInt(this.width);
        if (this.needLoadSize) {
            imageLoader.loadImageInfo(this.src, this.width === 0 ? this.maxWidth : this.width,
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

        } else {
            if (this.height === 0) {
                //没有设置高度的话默认和宽度一直
                this.height = this.width;
            }
            this.height = parseInt(this.height);
            this.show = true;
        }

    }
}