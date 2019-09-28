<!--下拉刷新列表视图-->
<template>
    <list class="flex_1"
          ref="scroll_container"
          :loadmoreoffset="loadMoreOffset"
          @scroll="onViewScroll"
          @loadmore="onLoadMore">
        <refresh class="flex_row"
                 :style="refreshContainerStyle"
                 @refresh="onViewOnRefresh"
                 @pullingdown="onViewOnPullingDown"
                 :display="refreshing ? 'show' : 'hide'">
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
        <cell ref="first_node"></cell>
        <slot></slot>
        <!--loading-->
        <loading  v-if="useLoading"
                  @loading="onLoading"
                 class="loading flex_row"
                 :display="loadingDisplayValue">
            <loading-indicator class=loading_indicator></loading-indicator>
            <text class="loading_text" :value="loadingText"></text>
        </loading>
    </list>
</template>

<script>
    import CommonHandle from "./minxins/CommonHandle";

    export default {
        name: "drop-refresh-list-view",
        mixins: [
            CommonHandle
        ]
    };
</script>

<style scoped lang="less" src="./style.less"></style>
