<!--app base header -->
<template>
    <div class="nav-container"
         :style="containerStyle">
        <!--背景-->
        <slot name="header-bg"></slot>
        <div class="nav-bar">
            <slot name="nav-bar-left"></slot>
            <slot name="nav-bar-center"></slot>
            <slot name="nav-bar-right"></slot>
        </div>
    </div>
</template>

<script>

    import appHeaderBaseProps from "./props/AppHeaderBaseProps";
    import {getStatusBarHeight} from "../view/FlexVIewHelper";
    import WeexThemeControl from "../../theme/WeexThemeControl";
    import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";

    const navBarOptions = AppConfigRegistry.getNavBarOptions();

    const defaultStyle = navBarOptions.style || {};

    export default {
        name: "nav-base-bar",
        props: {
            ...appHeaderBaseProps,

        },
        data() {

            return {}
        },
        computed: {
            containerStyle() {
                const style = {
                    ...defaultStyle
                };
                if (this.enableImmersive) {
                    //开启沉浸式导航
                    style.paddingTop = this.immersiveStatusBarHeight;
                }
                WeexThemeControl.resolveStyle({
                    backgroundColor: "nav-bar-background-color"
                }, style);
                return {
                    ...style,
                    ...this.navBarStyle
                };
            }
        },
        beforeMount() {

        },
        created() {
            //初始化状态栏
            getStatusBarHeight().then((height) => {
                this.immersiveStatusBarHeight = height;
            });
        }
    }
</script>

<style scoped lang="less" src="./style.less"></style>
