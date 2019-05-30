import DropRefreshProps from "../props/DropRefreshProps";
import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";
import {dom} from "common_weex/src/sdk/ExportWeexSdkModule";
import {isWeb} from "common_weex/src/constant/WeexEnv";

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
            default: true
        },
        ...DropRefreshProps
    },
    data() {
        return {
            //是否显示下拉刷新提示
            showTip: false,

            //是否处于刷新状态
            refreshing: false,

            //当前下拉刷新动画的帧
            currentAnimationFrame: 0,

            //图片列表
            images: [],

            //初始查询页码
            queryPage: 1,
            //是否处于查询中
            queryLoading: false,
            //是否查询结束
            queryEnd: false,
            //显示加载中
            // showLoading: false
        }
    },
    computed: {
        loadingDisplayValue() {

            return this.queryLoading ? "show" : "hide"
        }
    },
    methods: {

        /**
         * 页码发生下拉刷新
         * @param e
         */
        onViewOnRefresh(e) {
            if (e != null && isWeb) {
                e.preventDefault();
                e.stopPropagation();
            }

            //开始刷新
            this.refreshing = true;
            this.queryPage = 1;
            this.queryEnd = false;
            this.queryLoading = false;
            this.startRefreshAnimation();

            //向父组件广播刷新事件
            this.$emit("onRefresh");

            //加载数据
            const onLoadMore = this.onLoadMore(null, true);
            if (onLoadMore != null) {
                onLoadMore.finally(this.endRefreshAnimation);
            }
        },
        onViewOnPullingDown(e) {
            this.$emit("onPullingDown", e);
        },

        /**
         * 加载更多
         * @param event
         * @param isRefresh
         */
        onLoadMore(event, isRefresh = false) {

            if (this.queryLoading || this.queryEnd) {
                //防止连续触发，串行化
                return;
            }
            this.queryLoading = true;
            const loadMore = this.loadMore;
            if (typeof loadMore !== "function") {
                // throw new Error(`loadMore is not function`);
                return Promise.reject();
            }
            //向父组件广播事件
            // this.$emit("onLoadMore");

            return loadMore({
                queryPage: this.queryPage,
                querySize: this.querySize,
            }, isRefresh).finally((result) => {
                if (result != null && typeof result !== "number") {
                    if (result.constructor === Array) {
                        result = result.length;
                    } else {
                        result = 0;
                    }
                }
                if (result < this.querySize || this.querySize == -1) {
                    //查询结束
                    this.queryEnd = true;
                } else {
                    this.queryPage++;
                }
                this.queryLoading = false;
            });
        },

        /**
         * 页面滚动
         * @param event
         */
        onViewScroll(event) {
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

        onLoading() {

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
                this.onViewOnRefresh(null);
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