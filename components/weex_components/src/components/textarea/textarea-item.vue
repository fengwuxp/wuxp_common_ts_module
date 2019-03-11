<!--textarea-->
<template>
    <div class="text_wrapper"
         :style="wrapperStyle">
        <textarea :placeholder="placeholder"
                  ref="textarea"
                  class="text_arae"
                  :maxlength="maxLength"
                  :row="row"
                  :value="value"
                  :style="textareaStyle"
                  @input="inputText"></textarea>
        <text class="tip_text" :value="inputTipText"></text>
    </div>
</template>

<script>
    export default {
        name: "textarea-item",
        props: {
            placeholder: {
                default: ""
            },
            defaultValue: {
                default: ""
            },
            maxLength: {
                default: 255
            },
            width: {
                default: 750
            },
            height: {
                default: 260
            },
            borderWidth: {
                default: 1
            },
            borderRadius: {
                default: 10
            },
            borderColor: {
                default: "#e6e6e6"
            },
            padding: {
                default: 15
            },
            row: {
                default: 5
            }
        },
        data() {
            return {
                value: this.defaultValue
            }
        },
        computed: {
            inputTipText() {
                return `${this.value.length}/${this.maxLength}`;
            },
            wrapperStyle() {
                const {width, height, borderWidth, borderRadius, borderColor, padding} = this;
                let border = {};
                if (borderWidth > 0) {
                    border = {
                        borderWidth,
                        borderRadius,
                        borderColor,
                    }
                }
                return {
                    height,
                    width,
                    padding,
                    ...border
                };
            },
            textareaStyle() {
                const {width, height} = this;
                return {
                    height,
                    width,
                    paddingBottom: "40px"
                };
            }
        },
        methods: {
            inputText({value}) {
                if (value.length > this.maxLength) {
                    this.value = new String(this.value);
                    return;
                }
                this.value = value;
                const event = {
                    value
                };
                this.$emit("input", value);
                this.$emit("onChange", event);
            }
        }
    }
</script>

<style scoped>

    .text_wrapper {
        position: relative;
    }

    .text_arae {
        border-width: 0;
        border-color: rgba(255, 255, 255, 0);
    }

    .tip_text {
        position: absolute;
        bottom: 10px;
        right: 5px;
        font-size: 30px;
        color: #a2a2a2;
        text-align: right;
    }

</style>