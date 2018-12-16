<!--下拉刷新列表视图-->
<template>
    <flex-view :flexViewStyle="flexViewStyle">
        <list slot="app-body"
              style="flex: 1;"
              :loadmoreoffset="loadmoreoffset"
              @scroll="viewScroll"
              @loadmore="loadmore">
            <refresh-control v-if="indicatorModel!=='custom'"
                             ref="refresh-control"
                             @viewOnRefresh="viewOnRefresh"
                             @viewOnPullingDown="viewOnPullingDown"
                             :indicatorModel="indicatorModel"></refresh-control>
            <slot v-if="indicatorModel==='custom'" name="refresh-view"></slot>
            <slot></slot>
        </list>
    </flex-view>
</template>

<script>
    import RefreshControl from "./minxins";

    export default RefreshControl;
</script>

<style scoped lang="less" src="./style.less"></style>
