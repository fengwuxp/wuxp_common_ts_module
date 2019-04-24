<!-- root view, flex view-->
<template>
    <div class="app"
         :style="viewStyle"
         @viewappear="viewAppear"
         @viewdisappear="viewDisappear">
        <image v-if="enableImmersiveNavBar && immersiveStatusBarBgImage"
               :src="immersiveStatusBarBgImage"
               :style="immersiveStatusBarBgImageStyle"></image>
        <div v-if="enableImmersiveNavBar && immersiveStatusBarBgImage==null"
             :style="immersiveStatusBarStyle"></div>
        <slot name="app-header"></slot>
        <slot name="app-body"></slot>
        <slot name="app-footer"></slot>
        <image v-if="enableImmersiveBottomBar &&immersiveBottomBarBgImage"
               :src="immersiveBottomBarBgImage"
               :style="immersiveBottomBarStyle"></image>
        <div v-if="enableImmersiveBottomBar && immersiveBottomBarBgImage == null"
             :style="immersiveBottomBarStyle"></div>
    </div>
</template>

<script>

    import CommonHandle from "./mixins";

    export default {
        name: "flex-view",
        mixins: [CommonHandle],
    };
</script>

<style scoped lang="less" src="./styles.less"></style>
