<!--web 首页导航-->
<template>
    <flex-view :flexViewStyle="flexViewStyle">
        <nar-bar @back="back" slot="app-header" :navTitle="navTitle"></nar-bar>
        <div slot="app-body"
             class="app_body">
            <text>test</text>
            <text value="body11"></text>

        </div>
    </flex-view>
</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";
    import NarBar from "weex_components/src/layout/navbar/nav-bar";
    import AppMixin from "weex_starter/src/mixins/AppMixin";


    export default {
        // name: "TestView",
        mixins: [AppMixin],
        components: {FlexView, NarBar},
        props: {
            flexViewStyle: {
                default: () => ({
                    backgroundColor: "#fafafa"
                })
            },
            navTitle: {
                default: "测试"
            }
        },
        data() {
            return {}
        },

        methods: {

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