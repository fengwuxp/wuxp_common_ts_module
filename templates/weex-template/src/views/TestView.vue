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


    export default {
        name: "TestView",
        components: {FlexView,NarBar},
        props: {
            flexViewStyle: {
                default: () => ({
                    // backgroundColor: "#ff0000"
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
            back(){
                // console.log("back")
                this.$router.push("/test")
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