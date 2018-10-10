<!--基础的字体图标组件-->
<template>
    <i :style="iconStyle" :class="classNames">{{iconContent}}</i>
</template>

<script>
    export default {
        name: "base-icon",
        props: {
            fontFamily: {
                default: null,
                type: String,
                required: true
            },
            glyphMap: {
                default: null,
                required: true
            },
            name: {
                default: null,
                type: String
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
        created() {
            const {name, glyphMap} = this.props;
            let glyph = name ? glyphMap[name] || '?' : '';

            if (typeof glyph === "number") {
                glyph = String.fromCharCode(glyph);
            }
            this.iconContent = glyph;


        }
    }
</script>

<style scoped>

</style>
