import {isIos, isIphoneX} from "./WeexEnvUtil";

/**
 * ios 顶部高度
 * @type {number}
 */
const IOS_TOP_HEIGHT: number = 32;

/**
 * iphonex 顶部高度
 * @type {number}
 */
const IPHONEX_TOP_HEIGHT: number = 52;

/**
 * iphonex 底部需要增加的高度
 * @type {number}
 */
const IPHONEX_BOTTOM_HEIGHT: number = 68;

/**
 * 默认顶部高度
 * @type {number}
 */
const DEFAULT_HEADER_HEIGHT: number = 100;

/**
 * 默认底部高度
 * @type {number}
 */
const DEFAULT_FOOTER_HEIGHT: number = 83;


/**
 * 获取 iphone x的页面底部样式
 * @param height 底部高度
 * @return {*}
 */
const getViewFooterStyle = (height: number = DEFAULT_FOOTER_HEIGHT): object => {
    const style: any = {height: height};
    if (isIphoneX()) {
        //iphone x
        style.height = height + IPHONEX_BOTTOM_HEIGHT;
        style.paddingBottom = IPHONEX_BOTTOM_HEIGHT;
    }
    return style;
};

/**
 * 获取页面头部高度
 * @return {number}
 */
const getViewHeaderHeight = (): number => {

    return DEFAULT_HEADER_HEIGHT + getIosTopHeight();
};

/**
 * 获取ios顶部高度
 * @return {number}
 */
const getIosTopHeight = (): number => {
    if (!isIos()) {
        return 0;
    }
    if (isIphoneX()) {
        return IPHONEX_TOP_HEIGHT;
    } else {
        return IOS_TOP_HEIGHT;
    }
};

export {
    DEFAULT_HEADER_HEIGHT,
    DEFAULT_FOOTER_HEIGHT,
    IOS_TOP_HEIGHT,
    IPHONEX_TOP_HEIGHT,
    IPHONEX_BOTTOM_HEIGHT,
    getViewHeaderHeight,
    getViewFooterStyle,
    getIosTopHeight
}
