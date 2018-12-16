<!--原生首页导航-->
<template>
    <tab-bar-view @pageChange="pageChange"
                  :defaultViewIndex="0"
                  :viewItems="viewItems"
                  itemSelectedColor="#16b356"
                  itemDefaultColor="#989898"
                  ref="index_view">
    </tab-bar-view>
</template>

<script>
    import TabBarView from "weex_components/src/layout/tab-bar/tab-bar-view";
    import AppMixin from "weex_starter/src/mixins/AppMixin";
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
            pageChange({index, targetType}) {
                //TODO
                console.log("index", index, targetType);
            }
        },
        beforeMount() {

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