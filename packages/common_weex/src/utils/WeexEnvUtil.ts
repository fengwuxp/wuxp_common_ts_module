const WEEX_ENV_PLATFORM_NAME = weex.config.env.platform.toLocaleLowerCase();

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
/**
 * 是否为 iphoneX
 * @return {boolean}
 */
const isIphoneX = isIos && weex.config.env.deviceHeight === 2436;

export {
    isAndroid,
    isWeb,
    isIos,
    isIphoneX
}
