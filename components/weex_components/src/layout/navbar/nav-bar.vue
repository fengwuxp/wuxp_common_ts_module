<!-- 通用的 nav bar-->
<template>
    <nav-base-bar :style="style"
                  :backIcon="backIcon"
                  :backIconStyle="backIconStyle"
                  :navTitle="navTitle"
                  :backgroundImage="backgroundImage"
                  :immersiveStatusBarColor="immersiveStatusBarColor"
                  :immersiveStatusBarHeight="immersiveStatusBarHeight"
                  :enableImmersive="enableImmersive"
                  :leftStyle="leftStyle"
                  :centerStyle="centerStyle"
                  :rightStyle="rightStyle">
        <div slot="header-left">
            <image :src="backIcon" @click="clickLeft"></image>
        </div>
        <div slot="header-center">
            <text class="nav-bar-title" :value="navTitle"></text>
        </div>
    </nav-base-bar>
</template>

<script>
    import NavBaseBar from "./nav-base-bar";
    import appHeaderBaseProps from "./props/AppHeaderBaseProps";

    export default {
        name: "nav-bar",
        components: {NavBaseBar},
        props: {
            ...appHeaderBaseProps
        },
        data() {

        },
        methods: {
            clickLeft(event) {
                this.$emit("back", event);
            }
        },
        beforeMount() {
        }
    }
</script>

<style scoped>

</style>
