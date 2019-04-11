/**
 * 有路由功能的页面route view
 */
export interface RouteView<T> {

    /**
     * 页面可以接收参数
     */
    viewPrams?: T;

    toView: (pathname: string, params: object) => void | Promise<any>;

    backView: () => void | Promise<any>;

    redirectView: (pathname: string, params: object) => void | Promise<any>;

}