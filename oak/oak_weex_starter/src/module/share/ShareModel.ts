import {isWeb} from "common_weex/src/constant/WeexEnv";
import {WeexMobShareModule} from "./index";

if (isWeb) {

    const share: WeexMobShareModule = {

        initConfig(appKey: string, appSecret: string) {
            console.log("web端暂不支持");
        },


        /**
         *
         * @param type     分享平台
         * @param content  分享内容
         * @param succ     成功回调
         * @param error    失败回调
         */
        shareSignPlatform(type, content, succ, error) {
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 share");
    weex.registerModule('share', share);
}
