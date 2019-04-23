export const WEEX_ENV_PLATFORM_NAME = weex.config.env.platform.toLocaleLowerCase();

/**
 * 是否为浏览器
 * @return {boolean}
 */
const isWeb = WEEX_ENV_PLATFORM_NAME === 'web';

/**
 * 是否为安卓
 * @return {boolean}
 */
const isAndroid = WEEX_ENV_PLATFORM_NAME === 'android';

/**
 * 是否为ios
 * @return {boolean}
 */
const isIos = WEEX_ENV_PLATFORM_NAME === 'ios';

const deviceHeight = weex.config.env.deviceHeight;

/**
 * 是否为 iPhone X,iPhone XS
 * @return {boolean}
 */
const isIphoneX = isIos && deviceHeight === 2436;

/**
 * iPhone Xs Max
 */
const isIphoneXMax = isIos && deviceHeight === 2688;

/**
 * iPhone XR
 */
const isIphoneXR = isIos && deviceHeight === 1624;

//默认宽度
const DEFAULT_WIDTH = 750.0;
const deviceWidth = weex.config.env.deviceWidth;
// const deviceHeight = weex.config.env.deviceHeight;

export const rpx = deviceWidth / DEFAULT_WIDTH;

export {
    isAndroid,
    isWeb,
    isIos,
    isIphoneX,
    isIphoneXMax,
    isIphoneXR

}
