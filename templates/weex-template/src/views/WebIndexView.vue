<!--web 首页导航-->
<template>
    <flex-view :viewStyle="style">

    </flex-view>
</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";

    export default {
        name: "WebIndexView",
        components: {FlexView},
        props: {
            style: {
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