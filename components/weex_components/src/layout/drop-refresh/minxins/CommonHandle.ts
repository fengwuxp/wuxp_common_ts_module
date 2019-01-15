import DropRefreshProps from "../props/DropRefreshProps";
import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";
import {dom} from "common_weex/src/sdk/ExportWeexSdkModule";

export default {
    components: {},
    // props: Object.assign({
    //
    //     //是否立即刷新
    //     refreshNow: {
    //         default: false
    //     }
    // }, DropRefreshProps),
    props: {
        //是否立即刷新
        refreshNow: {
            default: false
        },
        ...DropRefreshProps
    },
    data() {
        return {
            showTip: false,
            //是否处于刷新状态
            refreshing: false,
            //当前下拉刷新动画的帧
            currentAnimationFrame: 0,
            //图片列表
            images: []
        }
    },
    methods: {
        viewOnRefresh(e) {
            //开始刷新
            this.refreshing = true;
            this.startRefreshAnimation();
            this.$emit("onRefresh", (message) => {
                if (message) {
                    //TODO 提示
                }
                //结束刷新
                this.endRefreshAnimation();
            });
        },

        viewOnPullingDown(e) {
            this.$emit("onPullingDown", e);
        },

        /**
         * 加载更多
         */
        loadMore(e) {
            this.$emit("onLoadMore");
        },

        /**
         * 页面滚动
         * @param event
         */
        viewScroll(event) {
            //页面滚动时调用的方法
            this.$emit("onScroll", event);
        },

        /**
         * 开始下拉刷新动画帧控制
         **/
        startRefreshAnimation() {
            setTimeout(() => {
                // 处理动画帧变化
                if (this.currentAnimationFrame < this.imagesLength) {
                    this.currentAnimationFrame++;
                } else {
                    this.currentAnimationFrame = 0;
                }
                if (this.refreshing) {
                    //循环处理
                    this.startRefreshAnimation();
                }
            }, this.frameTimes);
        },


        /**
         * 结束下拉刷新
         */
        endRefreshAnimation() {
            setTimeout(() => {
                //结束动画
                this.refreshing = false;
                setTimeout(() => {
                    //隐藏提示
                    this.showTip = false;
                }, 200);
            }, 500);
        },
        /**
         * 滚动到指定的节点，如果不填则滚到顶部
         * @param ref
         */
        scrollToElement(ref) {
            if (ref == null) {
                ref = this.$refs["first_node"];
            }
            dom.scrollToElement(ref, {
                offset: 0
            });
        },

        /**
         * 重置加载更多的事件
         */
        resetLoadMore() {
            this.$refs["scroll_container"].resetLoadmore();
        }
    },
    mounted() {
        if (this.refreshNow) {
            //页面一加载就刷新
            this.$nextTick(() => {
                this.viewOnRefresh(null);
            });
        }

    },
    beforeMount() {
        const imagesLength = this.imagesLength;
        const images = [];
        for (let i = 0; i < imagesLength; i++) {
            images[i] = getWeexResourceUrl(`animation/pull_to_refresh_people_${i}.png`);
        }
        this.images = images;
        console.log("---loadMoreOffset---->", this.loadMoreOffset);
    }
}