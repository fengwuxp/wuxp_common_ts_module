<!--web 首页导航-->
<template>
    <flex-view :flexViewStyle="flexViewStyle">
        <div slot="app-header">
            <text style="font-size: 36px" value="">23</text>
        </div>
    </flex-view>
</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";


    export default {
        name: "WebIndexView",
        components: {FlexView},
        props: {
            flexViewStyle: {
                default: () => ({
                    // backgroundColor: "#ff0000"
                })
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

<style scoped>

</style>