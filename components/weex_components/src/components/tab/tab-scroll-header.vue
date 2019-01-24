<!--tab scroll header-->
<template>
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
             @click="changeIndex(index,v.url)"
             :style="itemStyle(index)"
             :accessible="true"
             :aria-label="`${v.title?v.title:'标签'+index}`">

            <image :src="currentPage == index ? v.activeIcon : v.icon"
                   v-if="titleType === 'icon' && v.icon &&  !titleUseSlot"
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
            <div class="desc-tag" v-if="v.badge && !titleUseSlot">
                <text class="desc-text" :value="v.badge"></text>
            </div>
            <div v-if="v.dot && !v.badge && !titleUseSlot"
                 class="dot"></div>
            <div class="border-bottom"
                 v-if="tabStyles.hasActiveBottom && !titleUseSlot"
                 :style="itemBottomBorderStyle(index)"></div>
            <slot :name="`tab-title-${index}`" v-if="titleUseSlot"></slot>
        </div>
    </scroller>
</template>

<script>

    import props from "./TabHeaderProps";

    const dom = weex.requireModule('dom');

    export default {
        name: "tab-scroll-header",
        props: props,
        data() {
            return {
                currentPage: 0
            }
        },
        methods: {
            changeIndex(index) {
                const previousPage = this.currentPage;
                if (index < 0 || previousPage == index) {
                    return;
                }

                if (previousPage) {

                }

                if (this.startScrollIndex <= index) {
                    const elIndex = index - this.startScrollIndex;
                    const currentTabEl = this.$refs[`tab-title-${elIndex}`][0];
                    previousPage !== index && dom.scrollToElement(currentTabEl, {
                        animated: true
                    });
                }


                this.currentPage = index;
                this.$emit("changeTab", {
                    index
                });
            },
            itemStyle(index) {

                const style = {
                    height: this.tabStyles.height,
                    backgroundColor: this.currentPage === index ? this.tabStyles.activeBgColor : this.tabStyles.bgColor,
                };
                if (!this.tabStyles.hasActiveBottom) {
                    style.borderBottomColor = this.currentPage == index ? this.tabStyles.activeBottomColor : 'transparent';
                    style.borderBottomWidth = this.tabStyles.activeBottomHeight + "px";
                    style.borderBottomStyle = "solid";
                }

                style.width = this.tabStyles.width + "px";

                return style;
            },
            itemBottomBorderStyle(index) {
                let width = 0;
                const style = {
                    width,
                    height: this.tabStyles.activeBottomHeight + 'px',
                    backgroundColor: this.currentPage == index ? this.tabStyles.activeBottomColor : 'transparent'
                };
                width = this.tabStyles.activeBottomWidth;
                style.left = (this.tabStyles.width - this.tabStyles.activeBottomWidth) / 2
                style.width = width + "px";

                return style;
            }
        },
        created() {
            const {titleType, tabStyles} = this;
            if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
                dom.addRule('fontFace', {
                    'fontFamily': "wxcIconFont",
                    'src': `url(${tabStyles.iconFontUrl})`
                });
            }
        }
    }
</script>


<style scoped>


    .tab-title-list {
        flex-direction: row;
    }

    .title-item {
        justify-content: center;
        align-items: center;
        border-bottom-style: solid;
        position: relative;
    }

    .border-bottom {
        position: absolute;
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

    .desc-tag {
        position: absolute;
        top: 10px;
        right: 20px;
        border-bottom-right-radius: 14px;
        border-bottom-left-radius: 0;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
        background-color: #FF5E00;
        height: 26px;
        align-items: center;
        justify-content: center;
        padding-left: 6px;
        padding-right: 6px;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        position: absolute;
        top: 10px;
        right: 40px;
        background-color: #FF5E00;
    }

    .desc-text {
        font-size: 18px;
        color: #ffffff;
    }


</style>
