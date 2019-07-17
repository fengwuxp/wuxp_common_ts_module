import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {WexXinPayModule} from "./index";

if (isWeb) {

    const weixinPay: WexXinPayModule = {
        pay:  (parData: {}, success: (data) => void, failure: (data) => void)=> {
            console.log("web端暂不支持");
        }

    };
    console.log("注册自定义模块 weixinPay");
    weex.registerModule('weixinPay', weixinPay);
}
