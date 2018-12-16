<!--下拉刷新视图-->
<template>
    <scroller style="flex: 1;"
              :loadmoreoffset="loadmoreoffset"
              @scroll="viewScroll"
              @loadmore="loadMore">
        <refresh class="flex_row"
                 :style="refreshContainerStyle"
                 @refresh="viewOnRefresh"
                 @pullingdown="viewOnPullingDown"
                 :display="showRefresh ? 'show' : 'hide'">
            <div v-if="indicatorModel==='default'"
                 class="flex_row flex_v_center"
                 :style="refreshContentStyle">
                <image :src="images[currentAnimationFrame]"
                       :style="refreshImageStyle"></image>
                <div style="margin-left: 5px;">
                    <text class="loading_text" v-if="refreshTitle">{{refreshTitle}}</text>
                    <text class="loading_text" v-if="showTip===false">{{pullDownTipText}}</text>
                    <text class="loading_text" v-if="showTip">{{refreshTipText}}</text>
                </div>
            </div>
            <div v-if="indicatorModel==='indicator'"
                 class="flex_row flex_v_center"
                 :style="refreshContentStyle">
                <text class="loading_text" :value="refreshTitle"></text>
                <loading-indicator :style="indicatorStyle"></loading-indicator>
            </div>
        </refresh>
        <slot></slot>
    </scroller>
</template>
<script>
    import CommonHandle from "./minxins/CommonHandle";

    export default {
        name: "drop-refresh-view",
        mixins: [
            CommonHandle
        ]
    };
</script>
<style scoped lang="less" src="./style.less"></style>
