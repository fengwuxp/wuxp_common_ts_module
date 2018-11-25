/**
 * 开启沉浸式导航
 */
export function enableImmersive() {

    if (process.env.ANDROID_STATUS_COLOR) {
        return false;
    }

    return true;
}

//安卓是否开启沉浸式导航
export const ANDROID_ENABLE_IMMERSIVE = enableImmersive();