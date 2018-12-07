<!-- 通用的 nav bar-->
<template>
    <nav-base-bar :navBarStyle="navBarStyle"
                  :backIcon="backIcon"
                  :backIconStyle="backIconStyle"
                  :navTitle="navTitle"
                  :backgroundImage="backgroundImage"
                  :immersiveStatusBarColor="immersiveStatusBarColor"
                  :immersiveStatusBarHeight="immersiveStatusBarHeight"
                  :enableImmersive="enableImmersive"
                  :rightStyle="rightStyle">
        <div slot="nav-bar-left"
             :style="leftStyle"
             class="nav-bar-left">
            <image v-if="!isFontIcon(backIcon)"
                   :src="backIcon"
                   :style="backIconStyle"
                   @click="clickLeft"></image>
            <feather-icon v-if="isFontIcon(backIcon)"
                          :name="`${backIcon||'chevron-left'}`"></feather-icon>
        </div>
        <text slot="nav-bar-center"
              class="nav-bar-title"
              :style="navTitleStyle"
              :value="navTitle"></text>
    </nav-base-bar>
</template>

<script>
    import NavBaseBar from "./nav-base-bar";
    import FeatherIcon from "common_icons/weex/feather/index";
    import {getAppHeaderBaseProps} from "./props/AppHeaderBaseProps";

    export default {
        name: "nav-bar",
        components: {
            NavBaseBar,
            FeatherIcon
        },
        props: {
            ...getAppHeaderBaseProps()
        },
        data() {
            return {};
        },
        computed: {},
        methods: {
            /**
             * 是否为字体图标
             * @param icon
             */
            isFontIcon(icon) {
                if (/^(http|https|file)/i.test(icon)) {
                    return false;
                }
                return true;
            },
            clickLeft(event) {
                this.$emit("back", event);
            }
        },
        beforeMount() {
        }
    }
</script>

<style scoped lang="less" src="./style.less"></style>
