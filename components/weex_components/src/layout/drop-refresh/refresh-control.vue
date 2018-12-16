<!--刷新控制-->
<template>
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
</template>

<script>
    import DropRefreshProps from "./props/DropRefreshProps";
    import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";

    export default {
        name: "refresh-control",
        props: {
            ...DropRefreshProps
        },
        data() {
            return {
                showTip: false,
                showRefresh: false,
                //当前下拉刷新动画的帧
                currentAnimationFrame: 0,
                //图片列表
                images: []
            };
        },
        methods: {
            /**
             * 开始下拉刷新动画帧控制
             **/
            startRefreshAnimation() {
                setTimeout(this.animationFrameHandler, this.frameTimes);
            },
            animationFrameHandler() {
                console.log("this.currentAnimationFrame-->  " + this.currentAnimationFrame);
                if (this.currentAnimationFrame < this.imagesLength) {
                    this.currentAnimationFrame++;
                } else {
                    this.currentAnimationFrame = 0;
                }
                if (this.showRefresh) {
                    //循环处理
                    this.startRefreshAnimation();
                }
            },

            /**
             * 结束下拉刷新
             */
            endRefreshAnimation() {
                setTimeout(() => {
                    //结束动画
                    this.showRefresh = false;
                    setTimeout(() => {
                        //隐藏提示
                        this.showTip = false;
                    }, 200);
                }, 500);
            },

            /**
             * 下拉刷新被触发
             */
            viewOnRefresh(e) {
                this.$emit("viewOnPullingDown", e);
            },

            /**
             * 下拉事件
             */
            viewOnPullingDown(e) {
                this.$emit("viewOnPullingDown", e);
            }
        },

        beforeMount() {
            const imagesLength = this.imagesLength;
            const images = [];
            for (let i = 0; i < imagesLength; i++) {
                images[i] = getWeexResourceUrl(`images/animation/pull_to_refresh_people_${i}.png`);
            }
            this.images = images;
        }
    }
</script>

<style scoped>

</style>