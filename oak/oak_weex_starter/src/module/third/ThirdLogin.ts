import {isWeb} from "common_weex/src/constant/WeexEnv";
import {ThirdLoginModule, WxAuthResultInfo, WxLoginOptions} from "./index";


if (isWeb) {

    const thirdLogin:ThirdLoginModule={
        wxLogin(params: WxLoginOptions, callback: (data:WxAuthResultInfo) => void){
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 thirdLogin");
    weex.registerModule('thirdLogin', thirdLogin);
}
