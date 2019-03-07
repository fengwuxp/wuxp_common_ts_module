<!--手机验证码输入框-->
<template>
    <div class="input_container" :style="containerStyle">
        <div class="left_contanier flex_row flex_v_center">
            <input class="input"
                   ref="input"
                   :type="type"
                   :style="inputStyle"
                   :autofocus="autoFocus"
                   :value="value"
                   :maxlength="maxLength"
                   :placeholder="placeholder"
                   @focus="onFocus"
                   @blur="onBlur"
                   @input="onInput"/>
            <div class="flex_center"
                 @click="clearValueInner">
                <div class="clear_icon"
                     v-if="showClearIcon">
                    <ionicon-icon name="ios-close-circle"
                                  @onClick="clearValueInner"
                                  :iconStyle="clearIconStyle"></ionicon-icon>
                </div>
            </div>
        </div>
        <div v-if="!rightSlot">
            <div class="right_button flex_center"
                 :style="rightButtonStyle"
                 @click="onButtonClick">
                <text :style="buttonTextStyle"
                      :value="showButtonText"></text>
            </div>
        </div>
        <slot v-if="rightSlot" name="right"></slot>
    </div>
</template>

<script>

    import ioniconIcon from "common_icons/weex/ionicons/";
    import CommonThemeControl from "common_style/src/CommonThemeControl";
    import CountDownControl from "./mixins/CountDownControl";
    import {isAndroid} from "common_weex/src/constant/WeexEnv";
    import {
        ON_BLUR_EVENT_NAME,
        ON_CHANGE_EVENT_NAME,
        ON_FOCUS_EVENT_NAME,
        ON_INPUT_EVENT_NAME
    } from "../../config/EventNamesConfig";

    export default {
        name: "phone-code-input",
        components: {
            ioniconIcon
        },
        props: {
            type: {
                default: isAndroid ? 'tel' : 'number'
            },
            containerStyle: {
                default: () => ({
                    padding: "20px",
                })
            },
            useClear: {
                default: true
            },
            maxLength: {
                default: 6
            },

            inputStyle: {
                default: () => ({
                    fontSize: "32px",
                    lineHeight: "50px",
                    height: "50px",
                    color: CommonThemeControl.getStyleAttrByName("color-text-base")
                })
            },

            /**
             * 提示文字
             */
            placeholder: {
                default: "请输入验证码"
            },
            /**
             * 清除图标的样式
             */
            clearIconStyle: {
                default: () => ({
                    fontSize: "40px",
                    color: "#cccccc"
                })
            },
            rightSlot: {
                default: false
            }
        },
        mixins: [CountDownControl],
        data() {
            return {
                value: "",
                isFocus: false
            }
        },
        computed: {
            showClearIcon() {
                if (!this.useClear) {
                    return false;
                }
                if (!this.isFocus) {
                    return false;
                }
                return this.value.length > 0;
            }
        },
        mounted() {

        },
        methods: {
            onFocus(e) {
                this.isFocus = true;
                this.$emit(ON_FOCUS_EVENT_NAME, e);
            },

            onBlur(e) {
                this.isFocus = false;
                this.$emit(ON_BLUR_EVENT_NAME, e);
            },

            onInput({value}) {
                if (value.length > this.maxLength) {
                    //超长
                    this.value = new String(this.value);
                    return false;
                }
                this.value = value;
                //父组件中可以使用v-model
                this.$emit(ON_INPUT_EVENT_NAME, this.value);
                this.$emit(ON_CHANGE_EVENT_NAME, this.value);

            },
            clearValue() {
                this.value = "";
            },
            clearValueInner() {
                if (!this.showClearIcon) {
                    return;
                }
                this.clearValue();
                this.focus();
            },

            focus() {
                const $ref = this.$refs["input"];
                if ($ref) {
                    $ref.focus();
                }

            }
        },
    }
</script>

<style scoped lang="less">
    @import "styles";

    .input {
        flex: 1;
        border-width: 0;
        color: #3f3c3c;
        placeholder-color: #919191;
    }

    .right_button {
        background-color: @brand-primary;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .left_contanier {
        padding-right: 25px;
        flex: 1;
    }

</style>