<!--app base header -->
<template>
    <div class="nav-container"
         :style="containerStyle">
        <!--背景-->
        <slot name="header-bg"></slot>
        <div class="nav-bar">
            <slot class="nav-bar-left" name="nav-bar-left"></slot>
            <slot class="nav-bar-center" name="nav-bar-center"></slot>
            <slot class="nav-bar-right" name="nav-bar-right"></slot>
        </div>
    </div>
</template>

<script>

    import appHeaderBaseProps from "./props/AppHeaderBaseProps";
    import {getStatusBarHeight} from "../view/FlexVIewHelper";
    import WeexThemeControl from "../../theme/WeexThemeControl";

    export default {
        name: "nav-base-bar",
        props: {
            ...appHeaderBaseProps,

        },
        data() {

            return {

            }
        },
        computed: {
            containerStyle() {
                const style = this.style;
                if (this.enableImmersive) {
                    //开启沉浸式导航
                    style.paddingTop = this.immersiveStatusBarHeight;
                }
                return WeexThemeControl.resolveStyle({
                    backgroundColor: "nav-bar-background-color"
                }, style);
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
