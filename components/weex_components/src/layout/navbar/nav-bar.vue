<!-- 通用的 nav bar-->
<template>
    <nav-base-bar :backgroundImage="backgroundImage"
                  :immersiveStatusBarColor="immersiveStatusBarColor"
                  :immersiveStatusBarHeight="immersiveStatusBarHeight"
                  :enableImmersive="enableImmersive"
                  :rightStyle="rightStyle">
        <div slot="nav-bar-left"
             :style="leftStyle"
             class="nav-bar-left"
             @click="clickLeft">
            <image v-if="backIcon && !isFontIcon(backIcon)"
                   :src="backIcon"
                   :style="backIconStyle"></image>
            <feather-icon v-if="backIcon && isFontIcon(backIcon)"
                          @iconClicked="clickLeft"
                          :iconStyle="backIconStyle"
                          :name="`${backIcon||'chevron-left'}`"></feather-icon>
        </div>
        <div slot="nav-bar-center"
             class="nav-bar-center"
             :style="centerStyle">
            <text class="nav-bar-title"
                  :style="navTitleStyle"
                  :value="navTitle"></text>
        </div>
        <div slot="nav-bar-right"
             class="nav-bar-right"
             :style="rightStyle">
            <slot name="nav-bar-right"></slot>
        </div>
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
