import {WeexModule} from "../../../../index";

/**
 * weex 导航模块
 * https://weex.apache.org/cn/references/modules/navigator.html
 */
export interface WeexNavigatorModule extends WeexModule {

    /**
     * 把一个weex页面URL压入导航堆栈中，可指定在页面跳转时是否需要动画，以及操作完成后需要执行的回调函数
     * @param {WeexNavigatorPushOptions} options
     * @param {Function} callback
     */
    readonly  push: (options: WeexNavigatorPushOptions, callback: Function) => void;

    /**
     * 把一个 Weex 页面 URL 弹出导航堆栈中，可指定在页面弹出时是否需要动画，以及操作完成后需要执行的回调函数。
     * @param {WeexNavigatorPopOptions} options
     * @param {Function} callback
     * @return {{}}
     */
    readonly  pop: (options: WeexNavigatorPopOptions, callback: Function) => void;
}


export interface WeexNavigatorPushOptions {
    /**
     * 要压入的 Weex 页面的 URL
     */
    url: string;

    /**
     * "true" 示意为页面压入时需要动画效果，"false" 则不需要，默认值为 "true"
     */
    animated?: string;
}

export interface WeexNavigatorPopOptions {
    /**
     * "true" 示意为页面压入时需要动画效果，"false" 则不需要，默认值为 "true"
     */
    animated?: string;
}
