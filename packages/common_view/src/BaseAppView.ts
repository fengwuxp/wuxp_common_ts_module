import {AppView} from "./AppView";
import {RouteView} from "./RouteView";


/**
 * simple view
 */
export interface BaseAppView<T, V> extends AppView<T>, RouteView<V> {

    /**
     * 渲染页面头部
     */
    renderHeader?: () => T;

    /**
     * 渲染页面主体
     */
    renderBody: () => T;

    /**
     * 渲染页面底部
     */
    renderFooter?: () => T;
}