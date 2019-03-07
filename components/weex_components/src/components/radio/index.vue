<!--单选按钮-->
<!--引用自：https://github.com/hbteam/weex-droplet-ui -->
<template>
    <div class="wx-radio-items" :style="wrapperStyle">
        <div class="wx-radio-item"
             v-for="(item,i) in options"
             :key="i"
             :style="rowStyle"
             @click="handleClick(item)">
            <text :style="textStyles"
                  v-if="align === 'left'"
                  class="wx-radio-label-right"
                  :value="text"></text>
            <div class="wx-radio"
                 :style="radioStyle(item)"
                 :class="[isChecked(item) ? 'wx-radio-checked' : 'wx-radio-nochecked']">
            </div>
            <text :style="textStyles"
                  v-if="align === 'right'"
                  class="wx-radio-label-left"
                  :value="item.text"></text>
        </div>
    </div>
</template>
<script>
    import {ON_CHANGE_EVENT_NAME, ON_INPUT_EVENT_NAME} from "../../config/EventNamesConfig";

    export default {
        props: {
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
            /**
             * 单选按钮配置
             * {
             *     text:'',
             *     value:'',
             *     disabled:false
             * }
             */
            options: {
                default: []
            },
            defaultValue: {
                default: null
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
            }
        },

        data() {
            return {
                value: this.defaultValue
            }
        },

        computed: {
            wrapperStyle() {
                const {direction, width} = this;
                return {
                    flexDirection: direction,
                    width: `${width}px`
                }
            },
            rowStyle() {
                if (this.direction === 'column') {
                    return {
                        'width': `${this.width}px`,
                        'justify-content': 'space-between',
                        'padding-top': '24px',
                        'padding-bottom': '24px',
                        'padding-left': '40px',
                        'padding-right': '40px',
                    };

                }
                return {};
            },
            textStyles() {
                return {
                    color: this.textColor,
                    fontSize: `${this.textFontSize}px`
                }
            },

            checkedStyle() {
                const size = `${this.size}px`;
                return {
                    height: size,
                    width: size,
                    'border-radius': size,
                };
            },
        },


        methods: {


            emitEvent() {
                const {value} = this;
                const event = {value};
                this.$emit(ON_CHANGE_EVENT_NAME, event);
                this.$emit(ON_INPUT_EVENT_NAME, value);
            },

            handleClick({disabled, value}) {
                if (disabled) return;
                this.value = value;
                this.emitEvent();
            },
            radioStyle({disabled, value}) {
                const {size, checkedColor} = this;
                const _size = `${size}px`;
                const style = {
                    height: _size,
                    width: _size,
                    'border-radius': _size,
                    borderColor: this.isChecked({value}) ? checkedColor : "#dddddd"
                };
                if (disabled) {
                    style['background-color'] = '#d9d9d9';
                }
                return style;
            },
            isChecked({value}) {
                return this.value === value;
            }
        }
    }
</script>
<style scoped>
    .wx-radio-items {
        flex-direction: row;
        justify-content: space-between;
    }

    .wx-radio-item {
        flex-direction: row;
        align-items: center;
    }

    .wx-radio-label-right {
        padding-right: 10px;
    }

    .wx-radio-label-left {
        padding-left: 10px;
    }

    .wx-radio {
        position: relative;
        border-radius: 40px;
    }

    .wx-radio-checked {
        border-width: 10px;
    }

    .wx-radio-nochecked {
        background-color: #ffffff;
        border-width: 2px;
        border-style: solid;
        border-color: #ddd;
    }

    .checked {
        background-color: #ffffff;
    }

</style>