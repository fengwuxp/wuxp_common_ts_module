<!--开发信息页面-->
<template>
    <flex-view :viewStyle="viewStyle">
        <nav-bar slot="app-header"
                 @onBack="backView"
                 :navTitle="navTitle"></nav-bar>
        <div slot="app-body" class="flex_1">
            <div class="flex_center margin_top_20">
                <text class="text_default" value="本页面由开发者查看使用"></text>
            </div>
            <div class="flex_row flex_v_between bg_white padding_md border_bottom margin_top_20">
                <text class="text_default" value="环境"></text>
                <text class="text_default  " :value="jsEnv"></text>
            </div>
            <div class="flex_row flex_v_between bg_white padding_md border_bottom">
                <text class="text_default" value="JS模式"></text>
                <text class="text_default" :value="jsModel"></text>
            </div>
            <div class="flex_row flex_v_between bg_white padding_md border_bottom">
                <text class="text_default" value="weex skd version"></text>
                <text class="text_default" :value="sdkVersion"></text>
            </div>
            <div class="flex_row flex_v_between bg_white padding_md border_bottom">
                <text class="text_default" value="Os version"></text>
                <text class="text_default" :value="osVersion"></text>
            </div>
        </div>
    </flex-view>

</template>

<script>
    import FlexView from "weex_components/src/layout/view/flex-view";
    import AppMixin from "../mixins/AppMixin"
    import NavBar from "weex_components/src/layout/navbar/nav-bar";

    const jsEnv = process.env.NODE_ENV === "dev" ? "开发测试" : "正式";

    export default {
        components: {NavBar, FlexView},
        mixins: [AppMixin],
        props: {
            navTitle: {
                default: "开发信息"
            },
            viewStyle: {
                default: () => ({})
            }
        },
        data() {
            let jsModel = "本地";
            if (/^(http:\/\/|https:\/\/)/.test(weex.config.bundleUrl)) {
                jsModel = "远程";
            }
            return {
                jsEnv,
                jsModel,
                sdkVersion: weex.config.env.weexVersion,
                osVersion: weex.config.env.osVersion
            };
        },
        methods: {},
        beforeMount() {

        }
    }
</script>
<style scoped lang="less">

    @import "~weex_components/src/styles/base/flex";
    @import "~weex_components/src/styles/base/padding";
    @import "~weex_components/src/styles/base/border";


    .bg_white {
        background-color: #ffffff;
    }

    .text_default {
        font-size: 32px;
        color: #303030;
    }

    .margin_top_20 {
        margin-top: 20px;
    }
</style>
