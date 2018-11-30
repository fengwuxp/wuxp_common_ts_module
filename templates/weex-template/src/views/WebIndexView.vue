<!--web 首页导航-->
<template>
    <flex-view :flexViewStyle="flexViewStyle">
        <nar-bar slot="app-header" :navTitle="navTitle"></nar-bar>
        <div slot="app-body"
             class="app_body">
            <text>body</text>
            <text value="body11"></text>
        </div>
    </flex-view>
</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";
    import NarBar from "weex_components/src/layout/navbar/nav-bar";


    export default {
        name: "WebIndexView",
        components: {FlexView,NarBar},
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
            return {}
        },
        methods: {},
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