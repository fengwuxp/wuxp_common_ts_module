<!--轮播图-->
<template>
    <slider :style="sliderStyle"
            :auto-play="autoPlay"
            :interval="interval"
            :infinite="infinite"
            @change="onChange">
        <weex-image v-for="(src,i) in images"
                    :key="i"
                    @onLoad="onImageLoad"
                    :src="src"></weex-image>
        <indicator :style="finallyIndicatorStyle"
                   class="slider_indicator"></indicator>
    </slider>
</template>

<script>
    import WeexImage from "../picture/weex-image";
    import {weexTheme} from "../../theme/js_default_theme";
    import {ON_CHANGE_EVENT_NAME} from "../../config/EventNamesConfig";

    const defaultSliderHeight = 360;

    export default {
        name: "index",
        components: {WeexImage},
        props: {
            images: {
                default: []
            },
            carouselStyles: {
                default: {}
            },
            autoPlay: {
                default: true
            },
            interval: {
                default: 3000
            },
            infinite: {
                default: false
            },
            indicatorStyle: {
                default: {}
            }
        },
        data() {
            return {
                sliderHeight: defaultSliderHeight
            }
        },
        computed: {
            sliderStyle() {
                return {
                    width: `${weexTheme["render-width"]}px`,
                    ...this.carouselStyles,
                    height: `${this.sliderHeight}px`
                }
            },
            finallyIndicatorStyle() {
                return {
                    ...this.indicatorStyle,
                    width: `${weexTheme["render-width"]}px`,
                }
            }
        },
        methods: {
            onImageLoad({height}) {
                if (this.sliderHeight === defaultSliderHeight) {
                    this.sliderHeight = height;
                }

            },
            onChange(e) {
                this.$emit(ON_CHANGE_EVENT_NAME, e);
            }
        }
    }
</script>

<style scoped>

    .slider_indicator {
        position: absolute;
        itemColor: #41a9ff;
        itemSelectedColor: #ffffff;
        itemSize: 10px;
        height: 20px;
        bottom: 20px;
    }

</style>