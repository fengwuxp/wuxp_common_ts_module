<!--单选按钮-->
<!--引用自：https://github.com/hbteam/weex-droplet-ui-->
<template>
    <div class="wx-radio-items" :style="{'flex-direction': direction, 'width': width}">
        <div class="wx-radio-item"
             v-for="item in options"
             :style="rowStyle"
             @click="handleClick(item)">
            <text :style="textStyles" v-if="align === 'left'"
                  class="wx-radio-label-right"
                  :value="item.title"></text>
            <div class="wx-radio"
                 :style="getRadioStyle(item)"
                 :class="[item.checked ? 'wx-radio-checked' : 'wx-radio-nochecked']">
            </div>
            <text :style="textStyles"
                  v-if="align === 'right'"
                  class="wx-radio-label-left"
                  :value="item.title"></text>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            width: {
                type: String,
                default: '750px'
            },
            size: {
                type: String,
                default: '44px'
            },
            align: {
                type: String,
                default: 'left'
            },
            direction: {
                type: String,
                default: 'row'
            },
            options: {
                type: Array,
                default: function () {
                    return []
                },
                required: true
            },
            value: {
                type: Object,
                required: true
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
                type: String,
                default: '32px'
            }
        },

        data() {
            return {
                checkedStyle: {},
                textStyles: {},
                rowStyle: {},
            }
        },

        created() {
            this.setCheckedStyle();
            this.setTextStyle();
            this.setRowStyle();
            this.initChecked();
        },

        methods: {
            setTextStyle() {
                this.textStyles = {
                    color: this.textColor,
                    fontSize: this.textFontSize
                };
            },

            setRowStyle() {
                if (this.direction === 'column') {
                    this.rowStyle = {
                        'width': this.width,
                        'justify-content': 'space-between',
                        'padding-top': '24px',
                        'padding-bottom': '24px',
                        'padding-left': '40px',
                        'padding-right': '40px',
                    }
                }
            },

            setCheckedStyle() {
                const value = Number(this.size.replace('px', '')) / 2;
                const size = value + 'px';
                this.checkedStyle = {
                    height: size,
                    width: size,
                    'border-radius': size,
                };
            },

            getRadioStyle(item) {
                const style = {
                    height: this.size,
                    width: this.size,
                    'border-radius': this.size,
                    borderColor: item.checked ? this.checkedColor : "#dddddd"
                };
                if (item.disabled) {
                    style['background-color'] = '#d9d9d9';
                }
                return style;
            },

            initChecked() {
                this.options.forEach(item => {
                    if (item.checked) {
                        this.$emit('wxChange', item.value);
                        this.$emit('input', item.value);
                    }
                });
            },

            handleClick(item) {
                if (item.checked || item.disabled) return;
                this.options.forEach(el => {
                    el.checked = false;
                });
                item.checked = true;
                this.$emit('wxChange', item.value);
                this.$emit('input', item.value);
            },
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