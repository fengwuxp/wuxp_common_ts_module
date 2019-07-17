<!--weex 基础的字体图标组件-->
<template>
    <text :style="fontIconStyle"
          :value="iconContent"
          @click="itemClicked"/>
</template>

<script>
    import {getWeexResourceUrl} from "fengwuxp_common_weex/src/resources/ResourcePathParser";
    import {ON_CLICK_EVENT_NAME} from "../../weex_components/src/config/EventNamesConfig";

    const dom = weex.requireModule('dom');

    export default {
        name: "weex-icon",
        props: {
            fontFamily: {
                default: null,
                type: String,
                required: true
            },
            //字体文件的url
            fontUrl: {
                default: null,
                type: String,
                required: true
            },
            glyphMap: {
                default: null,
            },
            name: {
                default: null,
                type: String
            },
            /**
             * 字体图标的 code
             */
            charCode: {
                default: null,
                type: Number
            },
            size: {
                default: null,
                type: Number
            },
            color: {
                default: null,
                type: String
            },
            iconStyle: {
                default: {
                    fontWeight: 'normal',
                    fontStyle: 'normal'
                }
            }
        },
        data() {
            return {

            }
        },
        computed: {
            fontIconStyle() {
                const {size, color, iconStyle} = this;
                const style = iconStyle || {};
                return {
                    fontFamily: this.fontFamily,
                    fontSize: `${size}px`,
                    width: size || style.fontSize,
                    color,
                    ...style,
                }
            },
            iconContent() {
                const {name, charCode, glyphMap} = this;
                let glyph = charCode ? charCode : name ? glyphMap[name] || '?' : '';

                if (typeof glyph === "number") {
                    glyph = String.fromCharCode(glyph);
                }
                return glyph;
            }
        },
        methods: {
            itemClicked() {
                const {name, charCode} = this;
                this.$emit(ON_CLICK_EVENT_NAME, {
                    name,
                    charCode
                });
            }
        },
        // watch: {
        //     name(val) {
        //         this.name = val;
        //     },
        //     color(val) {
        //         this.color = val;
        //     }
        // },
        beforeMount() {


        },
        created() {
            //加载字体图标文件
            let {fontFamily, fontUrl} = this;

            //根据fontFamily加载字体图标文件
            if (!fontUrl) {
                fontUrl = getWeexResourceUrl(`${fontFamily}.ttf`);
            }
            // console.log("fontUrl", fontUrl);
            dom.addRule('fontFace', {
                'fontFamily': fontFamily,
                'src': `url('${fontUrl}')`
            });
        },
    }
</script>

<style scoped>

</style>
