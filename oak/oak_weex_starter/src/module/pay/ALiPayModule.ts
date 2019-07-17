import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {ALiPayModule} from "./index";

if (isWeb) {

    const aliPay:ALiPayModule = {

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
