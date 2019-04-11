export interface RouteViewParams {

    /**
     * 查询参数
     */
    queryParams?: {
        [k: string]: any
    },

    /**
     * 页面状态
     */
    state?: {
        [k: string]: any
    }
}

export interface AppRouterHelper {

    /**
     * 跳转到页面
     * @param pathname
     * @param viewPrams
     */
    toView: (pathname: string, viewPrams?: RouteViewParams) => Promise<any>;


    /**
     * 重定向到某个页面
     * @param pathname
     * @param viewPrams
     */
    redirectView: (pathname: string, viewPrams?: RouteViewParams) => Promise<any>;

    /**
     * 返回上一个页面
     */
    backView: () => Promise<void>;

}