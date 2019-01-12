<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A popup box with customized contents.-->
<!--chang by 2018-05-25 增加center位置支持-->
<!--组件来自于 alibaba weex-ui 做了一些改造-->
<template>
    <div>
        <div @touchend="handleTouchEnd">
            <wxc-overlay :show="haveOverlay && isOverShow"
                         v-if="show"
                         ref="overlay"
                         :topPosition="topPosition"
                         v-bind="overlayCfg"
                         @wxcOverlayBodyClicking="wxcOverlayBodyClicking"></wxc-overlay>
        </div>
        <div ref="wxc-popup"
             v-if="show"
             :height="_height"
             :hack="isNeedShow"
             @click="()=>{}"
             :class="['wxc-popup',pos]"
             :style="padStyle">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .wxc-popup {
        position: fixed;
        width: 750px;
    }

    .top {
        left: 0;
        right: 0;
    }

    .bottom {
        left: 0;
        right: 0;
    }

    .left {
        bottom: 0;
        top: 0;
    }

    .right {
        bottom: 0;
        top: 0;
    }

    .center {
    }

</style>

<script>

    import {isWeb, isIphoneX,} from "common_weex/src/constant/WeexEnv";
    import WxcOverlay from '../overlay';
    import {animation, dom} from "common_weex/src/sdk/ExportWeexSdkModule";
    import {IPHONEX_BOTTOM_HEIGHT} from "../../helper/FlexViewHelper";


    export default {
        components: {WxcOverlay},
        props: {
            show: {
                type: Boolean,
                default: false
            },
            pos: {
                type: String,
                default: 'bottom'
            },
            popupColor: {
                type: String,
                default: '#FFFFFF'
            },
            topPosition: {
                default: 0
            },
            overlayCfg: {
                type: Object,
                default: () => ({
                    hasAnimation: true,
                    timingFunction: ['ease-in', 'ease-out'],
                    duration: 300,
                    opacity: 0.6
                })
            },
            height: {
                type: [Number, String],
                default: 840
            },
            standOut: {
                type: [Number, String],
                default: 0
            },
            width: {
                type: [Number, String],
                default: 750
            },
            animation: {
                type: Object,
                default: () => ({
                    timingFunction: 'ease-in'
                })
            }
        },
        data: () => ({
            haveOverlay: true,
            isOverShow: true,
            deviceWidth: 750,
            deviceHeight: 1344,
        }),
        computed: {
            isNeedShow() {
                setTimeout(() => {
                    this.appearPopup(this.show);
                }, 50);
                return this.show;
            },
            _height() {
                this.appearPopup(this.show, 150);
                return this.height;
            },
            transformValue() {
                return this.getTransform(this.pos, this.width, this.height, true);
            },
            padStyle() {
                const {pos, width, height, topPosition, popupColor} = this;
                let style = {
                    width: `${width}px`,
                    backgroundColor: popupColor,
                    zIndex: 999999
                };
                pos === 'top' && (style = {
                    ...style,
                    top: `${-height + topPosition}px`,
                    // height: `${height}px`
                });
                pos === 'bottom' && (style = {
                    ...style,
                    bottom: `${-height}px`,
                    height: `${height}px`
                });
                pos === 'left' && (style = {
                    ...style,
                    top: `${topPosition}px`,
                    left: `${-width}px`
                });
                pos === 'right' && (style = {
                    ...style,
                    top: `${topPosition}px`,
                    right: `${-width}px`
                });

                if (pos === 'center') {
                    const {deviceWidth, deviceHeight} = this;

                    style = {
                        ...style,
                        left: `${deviceWidth / 2}px`,
                        top: `${deviceHeight / 2}px`
                    }
                }
                if (isIphoneX) {
                    //support iphonex;
                    const paddingBottom = parseInt((style.paddingBottom || "0px").replace("px", ""));
                    const height = parseInt((style.height || "0px").replace("px", ""));
                    style.paddingBottom = paddingBottom + IPHONEX_BOTTOM_HEIGHT;
                    style.height = height + IPHONEX_BOTTOM_HEIGHT;
                }

                return style;
            }
        },
        methods: {
            handleTouchEnd(e) {
                // 在支付宝上面有点击穿透问题
                const {platform} = weex.config.env;
                platform === 'Web' && e.preventDefault && e.preventDefault();
            },
            hide() {
                this.appearPopup(false);
                this.$refs.overlay.appearOverlay(false);
            },
            wxcOverlayBodyClicking() {
                this.isShow && this.appearPopup(false);
            },
            appearPopup(bool, duration = 300) {
                this.isShow = bool;
                const popupEl = this.$refs['wxc-popup'];
                if (!popupEl) {
                    return;
                }
                animation.transition(popupEl, {
                    styles: {
                        transform: this.getTransform(this.pos, this.width, this.height, !bool)
                    },
                    duration,
                    delay: 0,
                    ...this.animation
                }, () => {
                    if (!bool) {
                        this.$emit('wxcPopupOverlayClicked', {pos: this.pos});
                    }
                });
            },
            getTransform(pos, width, height, bool) {
                let _size = pos === 'top' || pos === 'bottom' ? height : width;
                let _transform;
                if (isWeb) {
                    _size -= this.standOut;
                }
                bool && (_size = 0);
                switch (pos) {
                    case 'top':
                        _transform = `translateY(${_size}px)`;
                        break;
                    case 'bottom':
                        _transform = `translateY(-${_size}px)`;
                        break;
                    case 'left':
                        _transform = `translateX(${_size}px)`;
                        break;
                    case 'right':
                        _transform = `translateX(-${_size}px)`;
                        break;
                    case 'center':
                        _transform = bool ? `translate(0,0)` : ` translate(-${width / 2}px,-${height / 2}px)`;
                        break;
                }
                return _transform;
            }
        },
        mounted() {
            if (this.pos === 'center') {
                setTimeout(() => {
                    dom.getComponentRect('viewport', (data) => {
                        const {result, size} = data;
                        if (!result) {
                            return;
                        }
                        const {width, height} = size;
                        this.deviceWidth = width;
                        this.deviceHeight = height;
                    });
                }, 600);
            }
        }
    }
</script>
