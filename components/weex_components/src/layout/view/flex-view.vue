<!-- root view, flex view-->
<template>
    <div class="app"
         :style="viewStyle"
         @viewappear="viewAppear"
         @viewdisappear="viewDisappear">
        <slot name="app-header"></slot>
        <slot name="app-body"></slot>
        <slot name="app-footer"></slot>
    </div>
</template>

<script>

    import FlexViewMixin from "./FlexViewMixin";

    export default FlexViewMixin;
</script>

<style scoped lang="less" src="./styles.less"></style>
