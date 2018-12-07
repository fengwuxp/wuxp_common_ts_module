import {Component} from "vue";

/**
 * weex 路由项
 */
export interface WeexRouteItem {

    component: Component | string,

    meta?: {
        //缓存 仅支持web环境
        keepAlive?: boolean,

        //是否为主页
        main?: boolean,

        //需要鉴权
        requireAuth?: boolean,

        //默认参数
        defaultParams?: {};
    }
}