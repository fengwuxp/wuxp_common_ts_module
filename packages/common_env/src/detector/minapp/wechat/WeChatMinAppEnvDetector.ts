import {EnvDetector} from "../../EnvDetector";

/**
 * 微信小程序 env 探测
 * @author wxup
 * @create 2018-09-29 15:40
 **/
export interface WeChatMinAppEnvDetector extends EnvDetector {

}

const weChatMinAppEnvDetector: WeChatMinAppEnvDetector = {
    isWeb: false,
    isAndroid: null,
    isIos: null
};

export default weChatMinAppEnvDetector;
