import {EnvDetector} from "../EnvDetector";

/**
 * weex 运行环境识别
 * @author wxup
 * @create 2018-09-29 15:27
 **/
export interface WeexEnvDetector extends EnvDetector {
    //可以添加一些自定义的识别判断，比如 is天猫等
}

const weexEnvDetector: WeexEnvDetector = {

    isAndroid: weex.config.env.platform === "android",
    isIos: weex.config.env.platform === "ios",
    isWeb: weex.config.env.platform === "web"
};

export default weexEnvDetector;
