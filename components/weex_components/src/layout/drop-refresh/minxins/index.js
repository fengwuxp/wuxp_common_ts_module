import RefreshControl from "../refresh-control";
import DropRefreshProps from "../props/DropRefreshProps";

export default {
    components: {RefreshControl},
    props: {
        flexViewStyle: {
            default: null
        },
        ...DropRefreshProps
    },
    data() {
        return {
            showRefresh: false,
        }
    },
    methods: {
        viewOnRefresh(e) {
            this.$emit("onRefresh", (message) => {
                if (message) {
                    //TODO 提示
                }
                //结束刷新
                this.$refs["refresh-control"].endRefreshAnimation();
            });
        },

        viewOnPullingDown(e) {
            this.$emit("onPullingDown", e);
        },
        /**
         * 加载更多
         */
        loadMore() {
            this.$emit("loadMore");
        },

        /**
         * 页面滚动
         * @param event
         */
        viewScroll(event) {
            //页面滚动时调用的方法
            this.$emit("onScroll", event);
        }
    },
    beforeMount() {

    }
}