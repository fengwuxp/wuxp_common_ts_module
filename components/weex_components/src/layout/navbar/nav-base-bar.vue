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

    import {getAppHeaderBaseProps} from "./props/AppHeaderBaseProps";
    import {getStatusBarHeight} from "../view/FlexVIewHelper";
    import CommonThemeControl from "common_style/src/CommonThemeControl";
    import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";



    export default {
        name: "nav-base-bar",
        props: {
            ...getAppHeaderBaseProps(),

        },
        data() {

            return {
                defaultStyle:null
            }
        },
        computed: {
            containerStyle() {
                const style = {
                    ...this.defaultStyle
                };
                if (this.enableImmersive) {
                    //开启沉浸式导航
                    style.paddingTop = this.immersiveStatusBarHeight;
                }

                return {
                    ...CommonThemeControl.resolveStyle({
                        backgroundColor: "nav-bar-background-color"
                    }, style),
                    ...this.navBarStyle
                };
            }
        },
        beforeMount() {

        },
        created() {
            const navBarOptions = AppConfigRegistry.getNavBarOptions();

            this.defaultStyle = navBarOptions.style || {};
            //初始化状态栏
            getStatusBarHeight().then((height) => {
                this.immersiveStatusBarHeight = height;
            });
        }
    }
</script>

<style scoped lang="less" src="./style.less"></style>
