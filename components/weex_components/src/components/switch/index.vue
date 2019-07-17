<template>
    <div class="wx-switch"
         :style="switchStyle"
         @click="handleClick">
        <text ref="switchCore" class="switch-core" :style="coreStyle"></text>
        <text class="blk" ref="blk" :style="blkStyle"></text>
    </div>
</template>

<script>

    import {isAndroid, isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
    import {animation} from "fengwuxp_common_weex/src/sdk/ExportWeexSdkModule";
    import {SIZE_CONFIG} from "./SizeConfigMap";
    import {ON_CHANGE_EVENT_NAME, ON_INPUT_EVENT_NAME} from "../../config/EventNamesConfig";


    export default {
        mixins: [],
        props: {
            defaultValue: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: null
            },
            disabled: {
                type: Boolean,
            },
            checkedColor: {
                type: String,
                default: '#027FF3',
            },

            /**
             * 大小 sm md lg
             */
            size: {
                default: "md"
            },

        },

        data() {
            return {
                // checked: false
            }
        },

        computed: {

            /**
             * switch 按钮的样式
             * @return {{[p: string]: *}}
             */
            switchStyle() {
                const {checkedColor, value, size} = this;
                const {width, height} = SIZE_CONFIG[size].switchConfig;
                return {
                    backgroundColor: value ? checkedColor : '#d9d9d9',
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${height}px`
                }
            },
            coreStyle() {
                const {size} = this;
                const {width, height, top} = SIZE_CONFIG[size].core;
                return {
                    top: `${top}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${height}px`
                }
            },
            blkStyle() {
                const {size} = this;
                const {width, height, top, left} = SIZE_CONFIG[size].blk;
                let blkStyle = {};
                if (isAndroid) {
                    blkStyle = {
                        'border-width': '1px',
                        'border-style': 'solid',
                        'border-color': '#d9d9d9',
                    }
                } else {
                    blkStyle = {
                        boxShadow: '0 1px 3px rgba(0,0,0,.4)',
                    };
                }
                return {
                    ...blkStyle,
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${height}px`
                };
            }
        },

        methods: {
            handleClick(event) {
                if (isWeb) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (this.disabled) return;
                this.value = !this.value;
                this.animation();
                this.blkAnimation();
            },

            animation(isInit = false) {
                let el = this.$refs.switchCore;
                // 设置为0.1 解决奇怪的Y轴会覆盖点击问题
                // let s = this.checked ? '0.1' : '1';
                let s = this.value ? 0 : 1;
                animation.transition(el, {
                    styles: {
                        transform: `scale(${s})`
                    },
                    duration: isInit ? 0 : 300,
                    timingFunction: 'linear',
                    needLayout: false,
                    delay: 0
                });
            },

            blkAnimation(isInit = false) {
                let el = this.$refs.blk;

                const {size} = this;
                const {switchConfig, blk, marginRight} = SIZE_CONFIG[size];

                let x = this.value ? `${switchConfig.width - blk.width - marginRight}px` : '0px';
                animation.transition(el, {
                    styles: {
                        transform: `translateX(${x})`
                    },
                    duration: isInit ? 0 : 300,
                    timingFunction: 'linear',
                    needLayout: false,
                    delay: 0
                }, () => {

                });
                this.$emit(ON_CHANGE_EVENT_NAME, this.value);
                this.$emit(ON_INPUT_EVENT_NAME, this.value);
            },

            // android不支持阴影
            initStyle() {

            },
            changeValue(value) {
                this.value = value;
                this.blkAnimation(true);
                this.animation(true);
            }
        },
        watch: {
            value(value) {
                this.changeValue(value);
            }
        },
        created() {
            if (this.value == null) {
                this.value = this.defaultValue || false;
            }
            this.initStyle();
        },
        mounted() {
            this.blkAnimation(true);
            this.animation(true);
        },
    }
</script>

<style scoped>
    .wx-switch {
        position: relative;
        border-width: 1px;
        border-style: solid;
        border-color: #dddddd;
        background-color: #d9d9d9;
    }

    .blk {
        position: absolute;
        z-index: 100;
        background-color: #ffffff;
    }

    .switch-core {
        position: absolute;
        background-color: #fdfdfd;
    }

</style>