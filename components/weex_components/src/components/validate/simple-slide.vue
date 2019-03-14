<!--简单的滑动验证-->
<template>
    <div :style="containerStyle">
        <div class="flex_center position_validate flex_1">
            <div class="validate_text w_validate flex_center">
                <text class="text_default">向右滑动验证</text>
            </div>
        </div>
        <div class="w_validate position_validate">
            <div class="validate_succ_bg"
                 :style="validateSuccessStyle"></div>
            <div class="validate_right_icon flex_center"
                 :style="rightIconStyle"
                 @panend="slideEnd"
                 @panmove="slideMove">
                <image :src="showIcon" class="img_60"></image>
            </div>
        </div>
        <div v-if="validateResult"
             class="flex_center position_validate validate_suu_text">
            <text class="text_white">验证成功！</text>
        </div>
    </div>
</template>

<script>
    export default {
        name: "simple-slide",
        props: {
            successIcon: {
                default: null
            },
            towardsTheRightIcon: {
                default: null
            },
            width: {
                default: 700
            }
        },
        data() {
            return {
                iconSize: 100,
                iconLeft: 0,
                validateStatus: {
                    left: 0,
                    top: 0,
                    width: 0
                },
                validateResult: false
            };
        },
        computed: {
            containerStyle() {
                return {
                    width: `${this.width}px`,
                    height: "100px",
                    position: "relative",
                }
            },
            showIcon() {
                if (this.validateResult) {
                    return this.successIcon;
                }
                return this.towardsTheRightIcon;
            },
            validateSuccessStyle() {

                const {left, width, top} = this.validateStatus;

                return {
                    left: `${left}px`,
                    top: `${left}px`,
                    width: `${width}px`,
                }
            },
            rightIconStyle() {
                const {iconSize, iconLeft} = this;
                return {
                    left: `${iconLeft}px`,
                    top: "0px",
                    width: `${iconSize}px`,
                    height: `${iconSize}px`
                }
            }
        },
        methods: {

            /**
             * 滚动
             * @param changedTouches
             */
            slideMove({changedTouches}) {
                if (this.validateResult) {
                    return;
                }
                const {screenX} = changedTouches[0];
                let left = screenX - 25;
                const maxPosition = this.width - 100;
                if (left >= maxPosition) {
                    left = this.width;
                    this.validateFirstSucc();
                } else if (left <= 0) {
                    left = 0;
                }
                this.setValidateValue(left);
            },

            /**
             * 滚动结束
             */
            slideEnd() {
                const width = this.validateStatus.width;
                if (width < this.width) {
                    //回到原点
                    this.validateStatus.width = 0;
                    this.animationChange();
                } else {
                }
            },

            /**
             * 动画改编
             * @param times
             * @param count
             */
            animationChange(times = 400, count = 10) {
                const t = times / count;
                let left = this.validateStatus.left;
                let l = left / 10;
                for (let i = 0; i < count; i++) {
                    setTimeout(() => {
                        left -= l;
                        if (i === count - 1) {
                            left = 0;
                        }
                        this.setValidateValue(left);
                    }, t * (i + 1))
                }

            },
            setValidateValue(val) {
                const width = val >= this.width ? this.width : val;
                const iconSize = this.iconSize;
                const maxLeftPosition = this.width - iconSize;
                this.iconLeft = width > maxLeftPosition ? maxLeftPosition : width;
                this.validateStatus = {
                    ...this.validateStatus,
                    width
                };
            },
            validateFirstSucc() {
                this.validateResult = true;
                this.setValidateValue(this.width);
                setTimeout(() => {
                    this.$emit("onSuccess");
                }, 1000);
            },
        }
    }
</script>

<style scoped lang="less">

    @import "../../styles/base/flex";

    .text_default {
        font-size: 32px;
        color: #303030;
    }

    .w_validate {
        width: 700px;
        height: 100px;
    }

    .position_validate {
        position: absolute;
        left: 0;
        top: 0;
    }

    .validate_text {
        border-color: #c3c3c3;
        border-width: 1px;
        border-style: solid;
        border-radius: 8px;
        background-color: #e2e2e2;
    }

    .validate_succ_bg {
        height: 100px;
        background-color: #48B34F;
        position: absolute;
    }

    .validate_suu_text {
        width: 600px;
        height: 100px;
    }

    .validate_right_icon {
        position: absolute;
        background-color: #ffffff;
    }

    .text_white {
        font-size: 32px;
        color: #ffffff;
    }

    .img_60 {
        width: 60px;
        height: 60px;
    }
</style>