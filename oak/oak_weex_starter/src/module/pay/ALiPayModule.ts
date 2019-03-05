import {isWeb} from "common_weex/src/constant/WeexEnv";
/**
 * 自定义videoPlayer 保存对象
 * Created by wuxp on 2017/6/6.
 */

if (isWeb) {

    const aliPay = {

        /**
         * 设置沙箱环境
         * @param enable
         */
        setSandboxEnv(enable: boolean) {
            console.log("web端暂不支持");
        },

        pay() {
            console.log("web端暂不支持");
        },
        auth() {
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 aliPay");
    weex.registerModule('aliPay', aliPay);
}
