import {isIos, isIphoneX,isIphoneXMax, isIphoneXR} from "common_weex/src/constant/WeexEnv";


/**
 * ios 顶部高度
 * @type {number}
 */
export const IOS_TOP_HEIGHT: number = 32;

/**
 * iphonex 顶部高度
 * @type {number}
 */
export const IPHONEX_TOP_HEIGHT: number = 52;

/**
 * iphonex 底部需要增加的高度
 * @type {number}
 */
export const IPHONEX_BOTTOM_HEIGHT: number = 68;

/**
 * 默认顶部高度
 * @type {number}
 */
export const DEFAULT_HEADER_HEIGHT: number = (process.env.DEFAULT_HEADER_HEIGHT || 100) as number;

/**
 * 默认底部高度
 * @type {number}
 */
export const DEFAULT_FOOTER_HEIGHT: number = 83;



/**
 * 获取页面头部高度
 * @return {number}
 */
export const getViewHeaderHeight = async (): Promise<number> => {

    const height = await getStatusBarHeight();

    return Promise.resolve(DEFAULT_HEADER_HEIGHT + height);
};

//android需要
let appStatusBarHelper: AppStatusBarHelper;

/**
 * 获取StatusBar顶部高度
 * @return {number}
 */
export const getStatusBarHeight = async (): Promise<number> => {

    if (isIphoneX) {
        return IPHONEX_TOP_HEIGHT;
    } else if (isIos) {
        return 0;
    }

    if (appStatusBarHelper == null) {
        return 0;
    }

    return appStatusBarHelper.getStatusBarHeight();
};


/**
 * 获取StatusBar顶部高度
 * @return {number}
 */
export const getBottomBarHeight = async (): Promise<number> => {

    if (isIphoneX || isIphoneXR || isIphoneXMax) {
        return IPHONEX_BOTTOM_HEIGHT;
    } else if (isIos) {
        return 0;
    }

    if (appStatusBarHelper == null) {
        return 0;
    }

    return appStatusBarHelper.getBottomBarHeight();
};


/**
 * 注册状态栏helper
 * @param helper
 */
export function registerAppStatusBarHelper(helper: AppStatusBarHelper) {
    appStatusBarHelper = helper;
}

/**
 * 状态栏helper 安卓端需要提供
 */
interface AppStatusBarHelper {

    /**
     * 获取状态栏
     */
    getStatusBarHeight: () => Promise<number>;

    /**
     * 获取底部bar的height
     */
    getBottomBarHeight: () => Promise<number>;
}
