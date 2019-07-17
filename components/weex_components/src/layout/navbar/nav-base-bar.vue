<!--app base header -->
<template>
    <div class="nav-container"
         :style="containerStyle">
        <!--背景图-->
        <image v-if="backgroundImage!=null"
               slot="header-bg"
               class="nav-bg-image"
               :src="backgroundImage">
        </image>
        <div class="nav-bar">
            <slot name="nav-bar-left"></slot>
            <slot name="nav-bar-center"></slot>
            <slot name="nav-bar-right"></slot>
        </div>
    </div>
</template>

<script>

    import {getAppHeaderBaseProps} from "./props/AppHeaderBaseProps";
    import CommonThemeControl from "fengwuxp_common_style/src/CommonThemeControl";
    import AppConfigRegistry from "fengwuxp_common_config/src/app/AppConfigRegistry";

    export default {
        name: "nav-base-bar",
        props: {
            ...getAppHeaderBaseProps(),

        },
        data() {
            const navBarOptions = AppConfigRegistry.getNavBarOptions();

            return {
                //默认样式
                defaultStyle: navBarOptions.style || {}
            }
        },
        computed: {
            containerStyle() {

                const {defaultStyle, navBarStyle} = this;

                const style = {
                    ...defaultStyle
                };


                return {
                    ...CommonThemeControl.resolveStyle({
                        backgroundColor: "nav-bar-background-color"
                    }, style),
                    ...navBarStyle
                };
            },
        },
        beforeMount() {


        },
        created() {


        }
    }
</script>

<style scoped lang="less" src="./style.less"></style>
