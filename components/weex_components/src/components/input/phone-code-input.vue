<!--手机验证码输入宽-->
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
                                  @iconClicked="clearValueInner"
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

    export default {
        name: "phone-code-input",
        components: {
            ioniconIcon
        },
        props: {
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
                this.$emit("onFocus", e);
            },

            onBlur(e) {
                this.isFocus = false;
                this.$emit("onBlur", e);
            },

            onInput({value}) {
                if (value.length > this.maxLength) {
                    //超长
                    this.value = new String(this.value);
                    return false;
                }
                this.value = value;
                //父组件中可以使用v-model
                this.$emit("input", this.value);
                this.$emit("onChange", this.value);

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
        padding-top: 15px;
        padding-bottom: 15px;
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