<!--web 首页导航-->
<template>
    <flex-view :flexViewStyle="flexViewStyle">

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
                    backgroundColor: "#ff0000"
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