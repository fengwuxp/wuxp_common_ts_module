import {isIos, isWeb} from "common_weex/src/constant/WeexEnv";


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
    // const androidStatusColor = process.env.ANDROID_STATUS_COLOR;
    return process.env.ANDROID_STATUS_COLOR == null;


}
