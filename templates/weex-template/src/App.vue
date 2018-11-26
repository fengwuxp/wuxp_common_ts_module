<template>
    <flex-view :style="viewStyle">
        <nav-bar slot="app-header" :navTitle="navTitle"></nav-bar>
        <div slot="app-body" class="flex_1"></div>
        <div slot="app-footer" class="app_footer"></div>
    </flex-view>
</template>

<script>


    import AppMixin from "weex_starter/src/mixins/AppMixin"
    import FlexView from "weex_components/src/layout/view/flex-view";
    import NavBar from "weex_components/src/layout/navbar/nav-bar";

    export default {
        components: {NavBar, FlexView},
        mixins: [AppMixin],
        props: {
            navTitle: {
                default: "测试页面"
            },
            viewStyle: {
                default: () => ({
                    backgroundColor:"#ff0000"
                })
            }
        },
        data() {
            return {};
        },
        methods: {},
        beforeMount() {

        }
    }
</script>
<style scoped lang="less">

    @import "./less/theme";

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
