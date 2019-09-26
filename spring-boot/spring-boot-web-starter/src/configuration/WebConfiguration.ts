/**
 * web config
 */
export interface WebConfiguration {

    /**
     * 设置路由组件加载者，用于异步加载组件
     */
   routeComponentLoader: () => any
}
