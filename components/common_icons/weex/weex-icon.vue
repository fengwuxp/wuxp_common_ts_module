<!--weex 基础的字体图标组件-->
<template>
    <text :style="fontIconStyle"
          :class="classNames"
          :value="iconContent"
          @click="itemClicked"/>
</template>

<script>
    import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";

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
            classNames: {
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
                iconContent: null
            }
        },
        computed: {
            fontIconStyle() {
                const {size, color, iconStyle} = this;
                return {
                    fontFamily: this.fontFamily,
                    fontSize: size,
                    width: size || iconStyle.fontSize,
                    color,
                    ...iconStyle
                }
            }
        },
        methods: {
            itemClicked() {
                const {name, charCode} = this;
                this.$emit('iconClicked', {
                    name,
                    charCode
                });
            }
        },
        beforeMount() {
            const {name, charCode, glyphMap} = this;
            let glyph = charCode ? charCode : name ? glyphMap[name] || '?' : '';

            if (typeof glyph === "number") {
                glyph = String.fromCharCode(glyph);
                console.log("glyph", glyph)
            }
            this.iconContent = glyph;

        },
        created() {
            //加载字体图标文件
            let {fontFamily, fontUrl} = this;

            //根据fontFamily加载字体图标文件
            if (!fontUrl) {
                fontUrl = getWeexResourceUrl(`../fonts/${fontFamily}.ttf`);
            }
            console.log("fontUrl", fontUrl);
            dom.addRule('fontFace', {
                'fontFamily': fontFamily,
                'src': `url('${fontUrl}')`
            });
        },
    }
</script>

<style scoped>

</style>
