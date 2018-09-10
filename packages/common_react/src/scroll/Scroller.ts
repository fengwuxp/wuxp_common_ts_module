import * as React from "react";
import {ScrollBar} from "./bar/ScrollBar";
import {UIEventHandler} from "react";

export interface ScrollerProps {


    /**
     * 滚动方向
     * 默认：v 垂直方向
     */
    direction?: "h" | "v"


    /**
     * 控制onscroll事件触发的频率，默认值为10，
     * 表示两次onscroll事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能。
     */
    // offsetAccuracy?: number

    /**
     * 去抖函数执行的毫秒数
     * 默认：100毫秒
     */
    debounceTimes?: number;

    /**
     * 视图滚动的时候在距离顶部或底部的某个位置的点将会触发 triggerEvent
     * 如果point大于0表示距离底部，小于0表示距离顶部
     */
    triggerPoint?: number[];

    /**
     * 下拉的时候触发的回调事件
     * @param point
     */
    triggerEventDropDown?: (point: number[]) => void;

    /**
     * 上拉的时候触发的回调
     * @param point
     */
    triggerEventPullUp?: (point: number[]) => void;

    /**
     * 滚动条
     * 如果没有设置则使用浏览器自带的滚动条
     */
    scrollBar?: ScrollBar;

    /**
     * 原始的滚动事件，但是会收到debounceTimes的去抖控制
     * @param event
     */
    onScroll?: (event: UIEventHandler<HTMLElement>) => void;

}

export interface ScrollerState {

}

/**
 * 通用的滚动视图
 * @author wxup
 * @create 2018-09-10 21:22
 **/
export default class Scroller<P extends ScrollerProps, S extends ScrollerState> extends React.Component<P, S> {


    constructor(props: P, context: any) {
        super(props, context);
    }
}
