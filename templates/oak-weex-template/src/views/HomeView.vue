<!--首页-->
<template>
    <drop-refresh-view :viewStyle="viewStyle"
                       @viewOnRefresh="viewOnRefresh">
        <text>首页</text>
    </drop-refresh-view>
</template>

<script>
    import AppMixin from "weex_starter/src/mixins/AppMixin"
    import DropRefreshView from "weex_components/src/layout/drop-refresh/drop-refresh-view";

    export default {
        components: {DropRefreshView},
        mixins: [AppMixin],
        props: {
            viewStyle: {
                default: () => ({
                    backgroundColor: "#ff0000"
                })
            }
        },
        data() {
            return {};
        },
        methods: {
            viewOnRefresh(end) {
                setTimeout(() => {
                    end();
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
