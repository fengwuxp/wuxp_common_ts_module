<!--web 首页导航-->
<template>
    <tab-bar-view @pageChange="pageChange"
                  defaultViewIndex="0"
                  :viewItems="viewItems"
                  itemSelectedColor="#16b356"
                  itemDefaultColor="#989898"
                  ref="index_view">
        <member-index-view slot="view_0"></member-index-view>
        <member-index-view slot="view_1"></member-index-view>
        <member-index-view slot="view_2"></member-index-view>
        <member-index-view slot="view_3"></member-index-view>
        <member-index-view slot="view_4"></member-index-view>
    </tab-bar-view>
</template>

<script>
    import TabBarView from "weex_components/src/layout/tab-bar/tab-bar-view";
    import AppMixin from "weex_starter/src/mixins/AppMixin";
    import MemberSpaceService from "../services/member/MemberSpaceService";
    import {NAV_ITEMS} from "../config/NavItems";
    import MemberIndexView from "./member/MemberIndexView";


    export default {
        name: "WebIndexView",
        mixins: [AppMixin],
        components: {MemberIndexView, TabBarView},
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
            pageChange() {

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