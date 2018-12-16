<!--tab bar nav-->

<template>
    <div>
        <div class="bottom_nav_container" :style="navBarStyle">
            <image v-if="navBarBgImage"
                   class="nav_bg"
                   :src="navBarBgImage"
                   :style="navBarBgImageStyle"></image>
            <div v-for="(item,index) in viewItems"
                 :style="navItemStyle"
                 class="nav-item" @click="navOnclick(index)">
                <image v-if="item.showType===NavShowType.DEFAULT"
                       :style="navIconStyle"
                       :src="item.icon"></image>
                <text v-if="item.showType===NavShowType.DEFAULT"
                      class="nav-item-text"
                      :style="item.textColor"
                      :value="item.text"></text>
                <text class="number-icon"
                      :style="numberDotStyle"
                      v-if="item.number && item.showType===NavShowType.DEFAULT"
                      :value="item.number>99?'...':item.number"></text>
            </div>
        </div>
        <image v-if="viewItems[2].showType===NavShowType.BIG_ICON"
               :style="bigIconStyle"
               @click="navOnclick(2)"
               :src="viewItems[2].icon"></image>
        <div v-if="isIphoneX" :style="bottomStyle"></div>
    </div>
</template>

<script>

    import {NavItemType} from "./NavItemType";
    import {NavShowType} from "./NavShowType";
    import DefaultNavProps from "./DefaultNavProps";
    import {isIphoneX} from "common_weex/src/constant/WeexEnv";
    import {IPHONEX_BOTTOM_HEIGHT} from "../view/FlexVIewHelper";

    /**
     * 原生下的页面样式
     * @param isSelected
     * @returns {*}
     */
    const getNativeEmbedStyle = (isSelected) => {
        if (isSelected) {
            return {
                visibility: "visible"
            }
        } else {
            return {
                visibility: "hidden"
            }
        }
    };


    export default {
        name: "tab-bar",
        props: {
            ...DefaultNavProps
        },
        data() {

            const bottomStyle = {
                width: 750,
                height: IPHONEX_BOTTOM_HEIGHT,
                backgroundColor: "transparent"
            };

            if (isIphoneX) {
                this.bigIconStyle.bottom = (this.bigIconStyle.bottom + IPHONEX_BOTTOM_HEIGHT) + "px";
            }

            return {
                currentViewIndex: 0,
                NavItemType,
                NavShowType,
                isIphoneX,
                bottomStyle

            };
        },
        methods: {
            navOnclick(index) {

                const targetItem = this.viewItems[index];
                const targetType = targetItem.targetType;
                const beforeChange = this.beforeChange;
                if (typeof beforeChange === "function") {
                    let r = beforeChange({
                        index,
                        targetType
                    });
                    if (!r) {
                        return;
                    }
                }
                const isChange = index !== this.currentViewIndex;

                if (targetType === NavItemType.FUNCTION) {
                    //目标是一个函数
                    // if (targetItem.showType === NavShowType.BIG_ICON && isChange) {
                    //     this.viewItems = this.getNavItems(index);
                    // }
                    this.viewItems = this.getNavItems(index);
                } else {
                    if (isChange) {
                        this.viewItems = this.getNavItems(index);
                    }
                }

                if (isChange) {
                    this.$emit("navChange", {
                        index,
                        targetType,
                        viewItems: this.viewItems
                    });

                }

            },
            /**
             * 获取导航item
             * @param selectedIndex 当前选中item
             **/
            getNavItems(selectedIndex) {
                let list = [];
                this.viewItems.forEach((item, i) => {
                    let isSelected = i === selectedIndex;
                    if (isSelected) {
                        item.textColor = {color: this.itemSelectedColor};
                    } else {
                        item.textColor = {color: this.itemDefaultColor};
                    }
                    item.icon = this.transformNavIcon(item.icon, isSelected);
                    item.style = getNativeEmbedStyle(isSelected);

                    list[i] = item;//Object.assign({},item);
                });
                this.currentViewIndex = selectedIndex;

                return list;
            }
        },
        beforeMount() {
            this.getNavItems(this.defaultViewIndex);
        }
    }
</script>

<style scoped lang="less">
    .bottom_nav_container {
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 2px;
        background-color: transparent;

    }

    .nav-item {
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }

    .nav-item-text {
        font-size: 24px;
        line-height: 28px;
    }

    .nav_bg {
        flex: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .number-icon {
        width: 40px;
        height: 40px;
        font-size: 22px;
        border-radius: 40px;
        background-color: red;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        font-weight: 700;
        position: absolute;
    }
</style>
