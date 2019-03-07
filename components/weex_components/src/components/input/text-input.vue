<!--基础的文本输入-->
<template>
    <div class="input_container" :style="containerStyle">
        <div v-if="!labelSlot"
             class="flex_row label"
             :style="labelContainerStyle">
            <image v-if="labelIcon"
                   :style="labelIconStyle"
                   :src="labelIcon"></image>
            <text v-if="label"
                  :style="labelStyle"
                  :value="label"></text>
        </div>
        <slot v-if="labelSlot" name="label"></slot>
        <input class="input"
               ref="input"
               :type="inputType"
               :style="inputStyle"
               :autofocus="autoFocus"
               :value="showValue"
               :maxlength="maxLength"
               :placeholder="placeholder"
               @focus="onFocus"
               @blur="onBlur"
               @input="onInput"/>
        <div v-if="!rightSlot"
             class="flex_center"
             @click="clearValueInner">
            <div class="clear_icon"
                 v-if="showClearIcon">
                <ionicon-icon name="ios-close-circle"
                              @onClick="clearValueInner"
                              :iconStyle="clearIconStyle"></ionicon-icon>
            </div>
        </div>
        <slot v-if="rightSlot" name="right"></slot>
    </div>
</template>

<script>
    import BaseInputProps from "./props/BaseInputProps";
    import ioniconIcon from "common_icons/weex/ionicons/";
    import {isWeb,isAndroid} from "common_weex/src/constant/WeexEnv";
    import {
        ON_BLUR_EVENT_NAME,
        ON_CHANGE_EVENT_NAME,
        ON_FOCUS_EVENT_NAME,
        ON_INPUT_EVENT_NAME
    } from "../../config/EventNamesConfig";

    export default {
        name: "base-input",
        components: {
            ioniconIcon
        },
        props: {
            ...BaseInputProps
        },

        data() {
            return {
                value: "",
                isFocus: false
            }
        },
        computed: {
            showValue() {
                return this.print(this.value);
            },
            needValue() {
                return this.formatter(this.value);
            },
            showClearIcon() {
                if (!this.useClear) {
                    return false;
                }
                if (!this.isFocus) {
                    return false;
                }
                return this.value.length > 0;
            },
            inputType(){

                const type = this.type;
                if (type === 'number') {
                    if (isAndroid) {
                        return 'tel';
                    }
                }
                return type;
            }
        },
        mounted() {

        },
        methods: {
            onFocus(e) {
                this.isFocus = true;
                this.$emit(ON_FOCUS_EVENT_NAME, e);
                if (isWeb){
                    //  const input = e.target;
                    // setTimeout(()=>{
                    //     input.scrollIntoView(true);
                    //     input.scrollIntoViewIfNeeded(true);
                    // },100);
                }
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

                //检查
                const r = this.checkInput(value);
                if (typeof r === "string") {
                    this.setValueAndEmitterChangeEvent(r);
                } else if (r === true) {
                    this.setValueAndEmitterChangeEvent(value);
                }

            },
            setValueAndEmitterChangeEvent(val) {
                this.value = val;
                //父组件中可以使用v-model
                this.$emit(ON_INPUT_EVENT_NAME, this.needValue);
                this.$emit(ON_CHANGE_EVENT_NAME, this.needValue);
            },
            clearValue() {
                this.setValueAndEmitterChangeEvent("");
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
            },
            blur(){
                const $ref = this.$refs["input"];
                if ($ref) {
                    $ref.blur();
                }
            }
        },
        beforeMount() {
            if (this.defaultValue) {
                this.value = this.defaultValue;
            }
        }
    }
</script>

<style scoped lang="less">
    @import "styles";


    .label {
        padding-right: 15px;
        justify-content: center;
        align-items: center;
    }

    .input {
        flex: 1;
        border-width: 0;
        color: #3f3c3c;
        placeholder-color: #919191;
    }
</style>