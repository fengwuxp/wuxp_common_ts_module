/**
 * weex dom 模块
 * https://weex.apache.org/cn/references/modules/dom.html
 */
import {WeexModule} from "../../../../index";

export interface WeexDomModule extends WeexModule{

    /**
     * 让页面滚动到 ref 对应的组件，这个 API 只能用于可滚动组件的子节
     * @param ref
     * @param {WeexDomScrollOptions} options
     */
    readonly  scrollToElement: (ref: any, options: WeexDomScrollOptions) => void;

    /**
     * 标签的 ref 获得其布局信息
     * @param ref
     * @param {(result: WeexComponentRect) => void} callback
     */
    readonly  getComponentRect: (ref: any, callback: (result: WeexComponentRect) => void) => void;

    /**
     * addRule是可以为dom 添加一条规则，目前支持自定义字体fontFace规则，构建自定义的font-family，可以在text使用
     * @param {string} name 规则名称
     * @param {WeexRuleOptions} options
     */
    readonly  addRule: (name: string, options: WeexRuleOptions) => void;
}

export interface WeexDomScrollOptions {

    /**
     * 一个到其可见位置的偏移距离，默认是 0
     */
    offset: number;

    /**
     * 0.10+
     * 是否需要附带滚动动画，默认是true
     */
    animated?: boolean;
}

/**
 *布局信息
 */
export interface WeexComponentRect {
    readonly result: boolean
    readonly size: WeexComponentRectSize
}

export interface WeexComponentRectSize {
    readonly bottom: number,
    readonly height: number,
    readonly left: number,
    readonly right: number,
    readonly top: number,
    readonly width: number
}

/**
 * 规则配置
 */
export interface WeexRuleOptions {
    fontFamily: string
    src: string
}
