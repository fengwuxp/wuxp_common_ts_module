<!--textarea-->
<template>
    <div class="text_wrapper"
         :style="wrapperStyle">
        <textarea :placeholder="placeholder"
                  ref="textarea"
                  class="text_arae"
                  :autofocus="autoFocus"
                  :maxlength="maxLength"
                  :rows="rows"
                  :value="value"
                  :style="textareaStyle"
                  @focus="onFocus"
                  @blur="onBlur"
                  @input="inputText"></textarea>
        <text class="tip_text" :value="inputTipText"></text>
    </div>
</template>

<script>


    import {
        ON_BLUR_EVENT_NAME,
        ON_CHANGE_EVENT_NAME,
        ON_FOCUS_EVENT_NAME,
        ON_INPUT_EVENT_NAME
    } from "../../config/EventNamesConfig";
    import {isWeb} from "common_weex/src/constant/WeexEnv";

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
            rows: {
                default: 5
            },
            autoFocus: {
                default: false
            }
        },
        mixins: [],
        data() {
            return {
                value: this.defaultValue,
                isFocus: false

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
                        borderWidth: `${borderWidth}px`,
                        borderRadius: `${borderRadius}px`,
                        borderColor,
                    }
                }
                return {
                    height: `${height}px`,
                    width: `${width}px`,
                    padding,
                    ...border
                };
            },
            textareaStyle() {
                const {width, height} = this;
                return {
                    height: `${height}px`,
                    width: `${width}px`,
                    paddingBottom: "40px"
                };
            },
            needValue() {
                return this.value;
            },
        },
        // watch: {
        //     value(value) {
        //         this.setValueInner(value, false)
        //     },
        // },
        methods: {
            inputText({value}) {
                this.setValueAndEmitterChangeEvent(value)

            },

            setValueAndEmitterChangeEvent(value) {
                if (value.length > this.maxLength) {
                    value = new String(this.value);

                }
                this.value = value;
                const event = {
                    value
                };
                //父组件中可以使用v-model
                this.$emit(ON_INPUT_EVENT_NAME, value);
                this.$emit(ON_CHANGE_EVENT_NAME, event);

            },
            onFocus(e) {
                this.isFocus = true;
                this.$emit(ON_FOCUS_EVENT_NAME, e);
                if (isWeb) {

                }
            },

            onBlur(e) {
                this.isFocus = false;
                this.$emit(ON_BLUR_EVENT_NAME, e);
            },
            focus() {
                const $ref = this.$refs["textarea"];
                if ($ref) {
                    $ref.focus();
                }
            },
            blur() {
                this.$refs["textarea"].blur();
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