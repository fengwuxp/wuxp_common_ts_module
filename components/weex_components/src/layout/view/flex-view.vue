<!-- root view, flex view-->
<template>
    <div class="app"
         :style="viewStyle"
         @viewappear="viewAppear"
         @viewdisappear="viewDisappear">
        <div v-if="enableImmersiveNavBar"
             :style="immersiveStatusBarStyle"></div>
        <slot name="app-header"></slot>
        <slot name="app-body"></slot>
        <slot name="app-footer"></slot>
        <div v-if="enableImmersiveBottomBar"
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
