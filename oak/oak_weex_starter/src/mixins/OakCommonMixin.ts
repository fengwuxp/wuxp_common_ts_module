import {broadcast} from "../ExpotrtWeexOAKModel";

export default {


    methods: {

        /**
         * 回到导航页面
         * @param index    第几个菜单项
         * @param refresh  是否刷新导航页面
         */
        toIndex({index, refresh}: { index?: number, refresh?: boolean } = {}) {

            if (index != null) {
                //发送广播
                broadcast.send("update", "toIndex", {index});
            }
            this.toView("index", {
                queryParams: {
                    weex_refresh: (refresh || false)
                }
            });
        }
    }
}