<!--首页-->
<template>
    <flex-view :flexViewStyle="viewStyle">
        <drop-refresh-view slot="app-body"
                           class="flex_1"
                           @onRefresh="viewOnRefresh"
                           :refreshNow="true">
            <text>首页</text>
        </drop-refresh-view>
    </flex-view>
</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";
    import AppMixin from "weex_starter/src/mixins/AppMixin"
    import DropRefreshView from "weex_components/src/layout/drop-refresh/drop-refresh-view";


    export default {
        components: {FlexView, DropRefreshView},
        mixins: [AppMixin],
        props: {
            viewStyle: {
                default: () => ({})
            }
        },
        data() {
            return {};
        },
        methods: {
            viewOnRefresh(end) {
                setTimeout(() => {
                    end();
                    console.log("请求结束")
                }, 2000)
            }
        },
        beforeMount() {

        }
    }
</script>
<style scoped lang="less">

    @import "../less/theme";

    .text_red {
        color: @primary-color;
    }

    .flex_1 {
        flex: 1;
        background-color: @fill-body;
    }

    .app_footer {
        height: 120px;
        background-color: #0e80d2;
    }
</style>
