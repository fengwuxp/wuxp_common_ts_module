<!--分类-->
<template>
    <flex-view :viewStyle="viewStyle">
        <div slot="app-body" class="flex_1">
            <text value="分类"></text>
        </div>
        <div slot="app-footer" class="app_footer"></div>
    </flex-view>

</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";
    import AppMixin from "weex_starter/src/mixins/AppMixin"

    export default {
        components: {FlexView},
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
        methods: {},
        beforeMount() {
            console.log(this._px2rem)
        }
    }
</script>
<style scoped lang="less">

    @import "../../less/theme";

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
