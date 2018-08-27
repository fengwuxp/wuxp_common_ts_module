import {WeexModule} from "../../../../index";

/**
 * weex 设置页面元数据信息
 * https://weex.apache.org/cn/references/modules/meta.html
 */
export interface WeexMetaModule extends WeexModule {

    /**
     * 需要注意的是：只有在页面渲染开始之前设置 viewport 才会生效。 也就是说，
     * setViewport 方法只能在入口文件中使用，而且要在 new Vue(...) 之前调用；
     * 如果是在组件中使用，就只有在渲染到该组件的时候才会执行相应的代码，此时页面已经处于渲染过程中，设置 viewport 将不会再生效。
     * @param options
     */
    readonly  setViewport: (options: WeexMetaOptions) => void;
}

export interface WeexMetaOptions {
    readonly width: number,
    readonly height?: number
}
