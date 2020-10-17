<template>
    <slider class="slider_container"
            :style="style"
            :auto-play="autoPlay"
            :interval="interval"
            :infinite="infinite"
            @change="change"
            v-if="show">
        <image v-for="(item,i) in items"
               class="slider_image"
               :style="style"
               :src="item.content"
               :key="i"
               @click="clickHandle(item)"
        ></image>
        <indicator :style="{width:renderWidth}" class="slider_indicator"></indicator>
    </slider>
</template>
<script>
    import {timer} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";

    const defaultHeight = 360;

    export default {
        mixins: [viewDataAnalysis],
        props: {
            autoPlay: {default: false},
            interval: {default: 3000},
            infinite: {default: false}
        },
        data() {
            let {floorHeight} = this.uiFloor;

            //是否使用图片加载器
            // const useImageLoad = floorHeight ? false : true;
            return {
                style: {
                    height: floorHeight ? floorHeight : defaultHeight,
                    width: this.renderWidth
                },
                show: true //!useImageLoad
            };
        },
        methods: {
            change() {
            },
            resizeImage({reqWidth, reqHeight}) {
                this.style = Object.assign(this.style, {
                    height: reqHeight + "px"
                });
            },
            updateStyle() {
                this.style = Object.assign(this.style, this.marginHandle);
                if (this.web) {
                    this.resizeImage({reqWidth: this.renderWidth, reqHeight: defaultHeight});
                } else {
                    this.loadImageByNative(this.renderWidth);
                }
                timer.setTimeout(() => {
                    this.show = true;
                }, 800);
            }
        },
        beforeMount() {
            this.updateStyle();
        }
    }
</script>
<style scoped>
    .slider_container {
        position: relative;
        background-color: #ffffff;
    }

    .slider_image {
        flex: 1;
        width: 100%;
    }

    .slider_indicator {
        position: absolute;
        itemColor: #41a9ff;
        itemSelectedColor: #ffffff;
        itemSize: 10px;
        height: 20px;
        bottom: 20px;
    }
</style>
