import {AppView} from "./AppView";


/**
 * simple view
 */
export interface SimpleView<T> extends AppView<T> {

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