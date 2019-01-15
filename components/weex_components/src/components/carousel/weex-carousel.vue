<!--轮播图-->
<template>
    <slider :style="sliderStyle"
            :auto-play="autoPlay"
            :interval="interval"
            :infinite="infinite"
            @change="onChange"
            v-if="show">
        <weex-image v-for="(src,i) in images"
                    :key="i"
                    @onLoad="onImageLoad"
                    :src="src"></weex-image>
    </slider>
</template>

<script>
    import WeexImage from "../picture/weex-image";

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
                    ...this.carouselStyles,
                    height: `${this.sliderHeight}px`
                }
            }
        },
        methods: {
            onImageLoad({height}) {
                if (this.sliderHeight === defaultSliderHeight) {
                    this.sliderHeight = height;
                }

            },
            onChange(e){
                this.$emit("onChange",e);
            }
        }
    }
</script>

<style scoped>

</style>