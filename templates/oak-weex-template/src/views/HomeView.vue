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
    import AppMixin from "weex_starter/src/mixins/AppMixin"
    import DropRefreshView from "weex_components/src/layout/drop-refresh/drop-refresh-view";
    import FlexView from "weex_components/src/layout/view/flex-view";


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
                console.log("准备开始请求")
                setTimeout(() => {
                    end();
                    console.log("请求结束")
                }, 2000)
            }
        },
        beforeMount() {
            console.log(this._px2rem)
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
