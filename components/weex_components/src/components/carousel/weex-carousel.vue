<!--轮播图-->
<template>
    <slider :style="sliderStyle"
            :auto-play="autoPlay"
            :interval="interval"
            :infinite="infinite"
            @change="onChange">
        <weex-image v-for="(src,i) in images"
                    :key="i"
                    :width="sliderWidth"
                    :height="sliderHeight"
                    :radius="sliderRadius"
                    @onLoad="onImageLoad"
                    :src="src"></weex-image>
        <indicator v-if="!useIndicatorSlot"
                   :style="finallyIndicatorStyle"
                   class="slider_indicator"></indicator>
        <solt v-if="useIndicatorSlot" name="indicator"></solt>
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
            useIndicatorSlot:{
                default:false
            },
            sliderWidth: {
                default: weexTheme["render-width"]
            },
            sliderHeight: {
                default: defaultSliderHeight
            },
            sliderRadius: {
                default: 0
            }
        },
        data() {
            return {}
        },
        computed: {
            sliderStyle() {
                const {sliderWidth, carouselStyles, sliderHeight} = this;
                return {
                    width: `${sliderWidth}px`,
                    height: `${sliderHeight}px`,
                    ...carouselStyles
                }
            },
            finallyIndicatorStyle() {
                return {
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

<style scoped lang="less">

    @import "../../theme/defualt_theme";

    .slider_indicator {
        position: absolute;
        itemColor: @brand-primary;
        itemSelectedColor: #ffffff;
        itemSize: 10px;
        height: 20px;
        bottom: 20px;
    }


</style>