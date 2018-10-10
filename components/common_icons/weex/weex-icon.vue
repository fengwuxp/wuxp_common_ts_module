<!--weex 基础的字体图标组件-->
<template>
    <text :style="iconStyle"
          :class="classNames"
          :value="iconContent"
          @click="itemClicked"/>
</template>

<script>
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
            style: {
                default: {
                    size: "inherit",
                    allowFontScaling: false,
                    color: "currentColor",
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
            iconStyle() {
                const {size, color, style} = this.props;
                return {
                    fontFamily: this.fontFamily,
                    fontSize: size,
                    color,
                    ...style
                }
            }
        },
        methods: {
            itemClicked() {
                const {name, charCode} = this.props;
                this.$emit('iconClicked', {
                    name,
                    charCode
                });
            }
        },
        created() {
            const {name, charCode, glyphMap} = this.props;
            let glyph = charCode ? charCode : name ? glyphMap[name] || '?' : '';

            if (typeof glyph === "number") {
                glyph = String.fromCharCode(glyph);
            }
            this.iconContent = glyph;

        },
        beforeCreate() {
            //加载字体图标文件
            const {fontFamily, fontUrl} = this.props;
            dom.addRule('fontFace', {
                'fontFamily': fontFamily,
                'src': `url('${fontUrl}')`
            });
        },
    }
</script>

<style scoped>

</style>
