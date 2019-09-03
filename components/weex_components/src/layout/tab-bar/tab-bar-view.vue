<!--tabbar view 且底部导航带背景图片-->
<template>
    <flex-view class="flex_1"
               :immersiveBottomBarColor="immersiveBottomBarColor"
               :enableImmersiveNavBar="false">
        <div slot="app-body" class="flex_1" v-if="isWeb">
            <div v-for="(item,i ) in viewItems"
                 v-if="item.targetType===NavItemType.VIEW && isLoad(i)"
                 v-show="i===currentViewIndex"
                 class="flex_1">
                <slot :name="'view_'+i"></slot>
            </div>
        </div>
        <div slot="app-body"
             class="flex_1"
             v-else>
            <!--加入单个加载-->
            <embed class="view_content"
                   v-for="(item,index) in viewItems"
                   v-if="item.targetType===NavItemType.VIEW && isLoad(index)"
                   :key="index"
                   :style="item.style"
                   :src="item.url"
                   type="weex"/>
            <!--扩展-->
            <slot name="extend"></slot>
        </div>
        <tab-bar slot="app-footer"
                 ref="bar-nav"
                 :viewItems="viewItems"
                 :beforeChange="beforeChange"
                 :defaultViewIndex="defaultViewIndex"
                 :itemSelectedColor="itemSelectedColor"
                 :itemDefaultColor="itemDefaultColor"
                 :navBarStyle="navBarStyle"
                 :navBarBgImage="navBarBgImage"
                 :navBarBgImageStyle="navBarBgImageStyle"
                 :bigIconStyle="bigIconStyle"
                 :navItemStyle="navItemStyle"
                 :navIconStyle="navIconStyle"
                 :numberDotStyle="numberDotStyle"
                 :transformNavIcon="transformNavIcon"
                 @onNavChange="navChange"></tab-bar>
    </flex-view>
</template>
<script>
    import FlexView from "../view/flex-view";
    import TabBar from "./tab-bar";

    import {NavItemType} from "./props/NavItemType";
    import DefaultNavProps from "./props/DefaultNavProps";
    import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";

    export default {
        //组件
        components: {FlexView, TabBar},

        //属性
        props: {
            ...DefaultNavProps
        },
        //初始化数据
        data() {
            return {
                currentViewIndex: 0,
                NavItemType,
                loadStatus: [],
                isWeb
            }
        },
        //方法列表
        methods: {
            navChange({index, targetType, viewItems}) {

                this.currentViewIndex = index;
                this.loadStatus[index] = true;
                this.viewItems = viewItems;
                this.$emit("onPageChange", {
                    index,
                    targetType
                });
            },

            setNavIndex(index) {
                this.$refs["bar-nav"].navOnclick(index);
            },

            isLoad(index) {
                return this.loadStatus[index];
            }
        },

        /*
        * 在挂载开始之前被调用
        * */
        beforeMount() {
            const currentViewIndex = parseInt(this.defaultViewIndex || 0);
            this.currentViewIndex = currentViewIndex;
            this.loadStatus[currentViewIndex] = true;
        }
    }
</script>
<style scoped lang="less">

    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .flex_1 {
        flex: 1;
        overflow: hidden;
    }
</style>
