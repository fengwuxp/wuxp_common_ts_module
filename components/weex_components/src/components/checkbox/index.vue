<!--复选框-->
<template>
    <div class="wrapper" @click="handle">
        <text v-if="align === 'left'"
              :style="textStyle"
              :value="text"></text>
        <div :style="checkStyle">
            <image v-if="checked" :src="checkedIcon" :style="iconStyle"></image>
        </div>
        <text v-if="align === 'right'"
              :style="textStyle" :value="text"></text>
    </div>
</template>

<script>
    import {ON_CHANGE_EVENT_NAME, ON_INPUT_EVENT_NAME} from "../../config/EventNamesConfig";

    export default {
        name: "check-box",
        props: {
            index: {
                default: 0
            },
            width: {
                type: Number,
                default: 750
            },
            size: {
                type: Number,
                default: 44
            },
            align: {
                type: String,
                default: 'left'
            },
            direction: {
                type: String,
                default: 'row'
            },
            text: {
                default: "",
            },
            defaultChecked: {
                default: false
            },
            disabled: {
                default: false
            },
            checkedColor: {
                type: String,
                default: '#027FF3'
            },
            textColor: {
                type: String,
                default: '#4D4D4D'
            },
            textFontSize: {
                type: Number,
                default: 32
            },
            checkedIcon: {
                default: null
            }
        },
        data() {
            return {
                checked: this.defaultChecked
            }
        },
        computed: {
            textStyle() {
                const {textFontSize, align, textColor} = this;
                return {
                    fontSize: `${textFontSize}px`,
                    color: textColor,
                    paddingLeft: align === 'left' ? '0' : "10px",
                    paddingRight: align === 'right' ? '0' : "10px"
                }
            },
            checkStyle() {
                const {size, checked, checkedColor} = this;
                return {
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: `${size}px`,
                    borderWidth: "2px",
                    borderColor: checked ? checkedColor : "#dddddd"
                };
            },
            iconStyle() {
                const {size} = this;
                const number = size - 4;
                return {
                    width: `${number}px`,
                    height: `${number}px`,
                };
            }
        },
        methods: {
            handle() {
                const {checked, disabled, index} = this;
                if (disabled) {
                    return;
                }
                this.checked = !checked;
                const event = {checked, index};
                this.$emit(ON_CHANGE_EVENT_NAME, event);
                this.$emit(ON_INPUT_EVENT_NAME, checked);
            }
        }
    }
</script>

<style scoped>

    .wrapper {
        flex-direction: row;
    }

</style>