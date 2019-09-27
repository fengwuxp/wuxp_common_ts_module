import {
    ON_BLUR_EVENT_NAME,
    ON_CHANGE_EVENT_NAME,
    ON_FOCUS_EVENT_NAME,
    ON_INPUT_EVENT_NAME
} from "../../../config/EventNamesConfig";
import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";


export default {

    methods: {

        onFocus(e) {
            this.isFocus = true;
            this.$emit(ON_FOCUS_EVENT_NAME, e);
            if (isWeb) {
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
        blur() {
            const $ref = this.$refs["input"];
            if ($ref) {
                $ref.blur();
            }
        },
        setTextFormatter(params: {
            //格式化匹配的正则表达式
            formatRule: string,
            //格式化匹配后用于替换的内容
            formatReplace: string,
            //从格式化后的内容还原原始内容的正则表达式
            recoverRule: string,
            //还原原始内容时用于替换的内容
            recoverReplace: string,
        }) {
            const $ref = this.$refs["input"];
            if ($ref && $ref.setTextFormatter) {
                $ref.setTextFormatter(params);
            }
        }
    }
}
