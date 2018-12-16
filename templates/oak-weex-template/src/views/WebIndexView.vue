<!--web 首页导航-->
<template>
    <tab-bar-view @pageChange="pageChange"
                  :defaultViewIndex="0"
                  :viewItems="viewItems"
                  itemSelectedColor="#16b356"
                  itemDefaultColor="#989898"
                  ref="index_view">
        <home-view slot="view_0"></home-view>
        <category-view slot="view_1"></category-view>
        <find-view slot="view_2"></find-view>
        <shop-cart-view slot="view_3"></shop-cart-view>
        <member-index-view slot="view_4"></member-index-view>
    </tab-bar-view>
</template>

<script>
    import TabBarView from "weex_components/src/layout/tab-bar/tab-bar-view";
    import AppMixin from "weex_starter/src/mixins/AppMixin";
    import {NAV_ITEMS} from "../config/NavItems";
    import MemberIndexView from "./member/MemberIndexView";
    import HomeView from "./HomeView";
    import CategoryView from "./category/CategoryView";
    import ShopCartView from "./shopcart/ShopCartView";
    import FindView from "./find/FindView";


    export default {
        name: "WebIndexView",
        mixins: [AppMixin],
        components: {FindView, ShopCartView, CategoryView, HomeView, MemberIndexView, TabBarView},
        props: {
            flexViewStyle: {
                default: () => ({
                    // backgroundColor: "#ff0000"
                })
            },
            navTitle: {
                default: "首页"
            }
        },
        data() {
            return {
                viewItems: NAV_ITEMS
            }
        },
        methods: {
            pageChange({index, targetType}) {
                //TODO
                console.log("index", index, targetType);
            }
        },
        beforeMount() {
            // MemberSpaceService.queryLikeStore({
            //     memberId: 1
            // }).then(() => {
            //
            //     console.log("1")
            //
            // }).catch(() => {
            //     console.log("2")
            // }).finally(() => {
            //     console.log("3")
            // });

        }
    }
</script>

<style scoped lang="less">

    .app_body {
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>