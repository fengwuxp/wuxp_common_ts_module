import {isIos, isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";


/**
 * 是否开启沉浸式导航
 */
export function enableImmersiveNavBar() {


    if (isIos) {
        return true;
    }
    if (isWeb) {
        return false;
    }

    //如果有配置安卓状态栏颜色则不开启
    return process.env.ANDROID_STATUS_COLOR == null;

}

/**
 * 是否开启沉浸式bottom bar
 */
export function enableImmersiveBottomBar() {


    if (isIos) {
        return true;
    }
    if (isWeb) {
        return false;
    }

    //如果有配置安卓底部状态栏颜色则不开启
    return process.env.ANDROID_BOTTOM_STATUS_COLOR == null;

}