<!--tab page-->
<template>
    <div class="wxc-tab-page">
        <scroller class="tab-title-list"
                  ref="tab-title-list"
                  :show-scrollbar="false"
                  scroll-direction="horizontal"
                  :data-spm="spmC"
                  :style="{
                             backgroundColor: tabStyles.bgColor,
                             height: (tabStyles.height)+'px',
                             maxHeight: (tabStyles.height)+'px',
                             paddingLeft:tabStyles.leftOffset+'px',
                             borderBottomWidth:'1px',
                             borderBottomStyle:'solid',
                             borderBottomColor:tabStyles.tabWrapperBorderColor
                           }">

            <div class="title-item"
                 v-for="(v,index) in tabTitles"
                 :key="index"
                 :ref="'tab-title-'+index"
                 @click="setPage(index,v.url)"
                 :style="{ width: tabStyles.width +'px', height: tabStyles.height +'px', backgroundColor: currentPage == index ? tabStyles.activeBgColor : tabStyles.bgColor }"
                 :accessible="true"
                 :aria-label="`${v.title?v.title:'标签'+index}`">

                <image :src="currentPage == index ? v.activeIcon : v.icon"
                       v-if="titleType === 'icon' && !titleUseSlot"
                       :style="{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}"></image>

                <text class="icon-font"
                      v-if="titleType === 'iconFont' && v.codePoint && !titleUseSlot"
                      :value="v.codePoint"
                      :style="{fontFamily: 'wxcIconFont',fontSize: tabStyles.iconFontSize+'px', color: currentPage == index ? tabStyles.activeIconFontColor : tabStyles.iconFontColor}">
                </text>

                <text v-if="!titleUseSlot"
                      :style="{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage == index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage == index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}"
                      :value="v.title"
                      class="tab-text"></text>
                <div class="border-bottom"
                     v-if="tabStyles.hasActiveBottom && !titleUseSlot"
                     :style="{ width: tabStyles.activeBottomWidth+'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: tabStyles.activeBottomHeight+'px', backgroundColor: currentPage == index ? tabStyles.activeBottomColor : 'transparent' }"></div>
                <slot :name="`tab-title-${index}`" v-if="titleUseSlot"></slot>
            </div>
        </scroller>
        <div class="tab-page-wrap"
             ref="tab-page-wrap"
             @panstart="_onTouchStart"
             @panmove="_onTouchMove"
             @panend="_onTouchEnd"
             :prevent-move-event="true"
             @horizontalpan="startHandler">
            <div ref="tab-container"
                 class="tab-container"
                 :style="{width:750*tabTitles.length}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script>
    const dom = weex.requireModule('dom');
    const animation = weex.requireModule('animation');
    const swipeBack = weex.requireModule('swipeBack');
    const expressionBinding = weex.requireModule('expressionBinding');
    import {isIos} from "fengwuxp_common_weex/src/constant/WeexEnv";

    // import BindXEnv from "../utils/BindXEnv";
    // const supportsEB = BindXEnv.supportsEB();
    // const supportsEBForIos = BindXEnv.supportsEBForIos();

    const supportsEB = false;
    const supportsEBForIos = false;

    const IS_IOS = isIos;

    export default {
        props: {
            tabTitles: {
                type: Array,
                default: () => ([])
            },
            panDist: {
                type: Number,
                default: 200
            },
            spmC: {
                type: [String, Number],
                default: ''
            },
            titleUseSlot: {
                type: Boolean,
                default: false
            },
            tabStyles: {
                type: Object,
                default: () => ({
                    bgColor: '#FFFFFF',
                    tabWrapperBorderColor: "#e6e6e6",
                    titleColor: '#666666',
                    activeTitleColor: '#3D3D3D',
                    activeBgColor: '#FFFFFF',
                    isActiveTitleBold: true,
                    iconWidth: 70,
                    iconHeight: 70,
                    width: 160,
                    height: 120,
                    fontSize: 24,
                    hasActiveBottom: true,
                    activeBottomColor: '#FFC900',
                    activeBottomWidth: 120,
                    activeBottomHeight: 6,
                    textPaddingLeft: 10,
                    textPaddingRight: 10,
                    leftOffset: 0,
                })
            },
            titleType: {
                type: String,
                default: 'icon'
            },
            tabPageHeight: {
                type: [String, Number],
                default: 1334
            },
            isTabView: {
                type: Boolean,
                default: true
            },
            needSlider: {
                type: Boolean,
                default: true
            },
            duration: {
                type: [Number, String],
                default: 300
            },
            timingFunction: {
                type: String,
                default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            wrapBgColor: {
                type: String,
                default: '#f2f3f4'
            },
            //默认的页码
            defaultPageIndex: {
                default: 0
            }
        },
        data: () => ({
            currentPage: 0,
            isMoving: false,
            startTime: 0,
            deltaX: 0,
            translateX: 0,
            startPosX: 0,
            startPosY: 0,
            judge: 'INITIAL'
        }),
        created() {
            const {titleType, tabStyles} = this;
            if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
                dom.addRule('fontFace', {
                    'fontFamily': "wxcIconFont",
                    'src': `url(${tabStyles.iconFontUrl})`
                });
            }
        },
        mounted() {
            if (swipeBack && swipeBack.forbidSwipeBack) {
                swipeBack.forbidSwipeBack(true);
            }
            if (supportsEBForIos && this.needSlider && this.isTabView) {
                setTimeout(() => {
                    const tabPageEl = this.$refs['tab-page-wrap'];
                    if (tabPageEl && tabPageEl.ref) {
                        expressionBinding.enableBinding(tabPageEl.ref, 'pan');
                        this.bindExp(tabPageEl);
                    }
                }, 20);
            }
            this.$nextTick(() => {
                const pageIndex = this.defaultPageIndex;
                // if (pageIndex > 0) {
                //     this.setPage(pageIndex);
                // }
                this.setPage(pageIndex);
            })
        },
        methods: {
            next() {
                let page = this.currentPage;
                if (page < this.tabTitles.length - 1) {
                    page++;
                }
                this.setPage(page);
            },
            prev() {
                let page = this.currentPage;
                if (page > 0) {
                    page--;
                }
                this.setPage(page);
            },
            startHandler(e) {
                if (supportsEBForIos && e.state === 'start' && this.isTabView && this.needSlider) {
                    // list下拉和到最下面问题修复
                    setTimeout(() => {
                        this.bindExp(this.$refs['tab-page-wrap']);
                    }, 0)
                }
            },
            bindExp(element) {
                if (!this.isMoving && element && element.ref) {
                    const tabElement = this.$refs['tab-container'];
                    const {currentPage, panDist} = this;
                    const dist = currentPage * 750;
                    // x-dist
                    const args = [{
                        element: tabElement.ref,
                        property: 'transform.translateX',
                        expression: `{\"type\":\"-\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${dist}}]}`
                    }];
                    expressionBinding.createBinding(element.ref, 'pan', '', args, e => {
                        const {deltaX, state} = e;
                        if (state === 'end') {
                            if (deltaX < -panDist) {
                                this.next();
                            } else if (deltaX > panDist) {
                                this.prev();
                            } else {
                                this.setPage(currentPage);
                            }
                        }
                    });
                }
            },
            setPage(page, url = null, animated = true) {
                if (!this.isTabView) {
                    return;
                }
                if (this.isMoving === true) {
                    return;
                }
                this.isMoving = true;
                const previousPage = this.currentPage;
                const currentTabEl = this.$refs[`tab-title-${page}`][0];
                const {width} = this.tabStyles;
                const appearNum = parseInt(750 / width);
                const tabsNum = this.tabTitles.length;
                const offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

                if (appearNum < tabsNum) {
                    (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
                        offset, animated
                    });

                    page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
                        offset: -width * page,
                        animated
                    });
                }

                this.isMoving = false;
                this.currentPage = page;

                if (IS_IOS) {
                    // 高版本ios 手淘上面会有不固定情况，hack一下
                    setTimeout(() => {
                        this._animateTransformX(page, animated);
                        this.$emit('onChangeTab', {page});
                    }, 10);
                } else {
                    this._animateTransformX(page, animated);
                    //tabPageCurrentTabSelected
                    this.$emit('onChangeTab', {page});
                }
            },
            // jumpOut(url) {
            //     url && Utils.goToH5Page(url)
            // },
            _animateTransformX(page, animated) {
                const {duration, timingFunction} = this;
                const computedDur = animated ? duration : 0.00001;
                const containerEl = this.$refs[`tab-container`];
                const dist = page * 750;
                animation.transition(containerEl, {
                    styles: {
                        transform: `translateX(${-dist}px)`
                    },
                    duration: computedDur,
                    timingFunction,
                    delay: 0
                }, () => {
                });
            },
            _onTouchStart(e) {
                if (supportsEB || !this.isTabView || !this.needSlider) {
                    return;
                }
                this.startPosX = this._getTouchXPos(e);
                this.startPosY = this._getTouchYPos(e);
                this.deltaX = 0;
                this.startTime = new Date().getTime();
            },
            _onTouchMove(e) {
                if (supportsEB || !this.isTabView || !this.needSlider) {
                    return;
                }
                this.deltaX = this._getTouchXPos(e) - this.startPosX;
                this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);
                if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {
                    this.judge = 'SLIDE_ING';
                }
            },
            _onTouchEnd() {
                if (supportsEB || !this.isTabView || !this.needSlider) {
                    return;
                }
                if (this.judge === 'SLIDE_ING') {
                    if (this.deltaX < -50) {
                        this.next();
                    } else if (this.deltaX > 50) {
                        this.prev();
                    }
                }
                this.judge = 'INITIAL';
            },
            _getTouchXPos(e) {
                return e.changedTouches[0]['pageX'];
            },
            _getTouchYPos(e) {
                return e.changedTouches[0]['pageY'];
            }
        },
        beforeMount() {
            const pageIndex = this.defaultPageIndex;
            if (pageIndex > 0) {
                this.currentPage = pageIndex;
            }
        }
    };
</script>


<style scoped>
    .wxc-tab-page {
        width: 750px;
        flex: 1
    }

    .tab-title-list {
        flex-direction: row;
    }

    .title-item {
        justify-content: center;
        align-items: center;
        border-bottom-style: solid;
    }

    .border-bottom {
        position: absolute;
        bottom: 0;
    }

    .tab-page-wrap {
        width: 750px;
        flex: 1;
        overflow: hidden;
    }

    .tab-container {
        flex-direction: row;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .tab-text {
        lines: 1;
        text-overflow: ellipsis;
    }

    .icon-font {
        margin-bottom: 8px;
        font-family: wxcIconFont;
    }

</style>
