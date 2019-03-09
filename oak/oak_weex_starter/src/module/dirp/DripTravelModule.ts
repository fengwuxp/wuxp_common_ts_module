import {isWeb} from "common_weex/src/constant/WeexEnv";
import {CallAppParam, WeexDripTravelModule} from "./index";


if (isWeb) {

    const dripTravelModule: WeexDripTravelModule = {
        showDDPage: (params: any, success, failure) => {
            console.log("web端不支持ddcx", params);
        },
        callPhone: function (params, p2, p3) {
            console.log("web端不支持ddcx", params);
        },
        asyncCallDDApi: function (params: string, p2: any, p3: (data) => void, p4: (data) => void) {
            console.log("web端不支持ddcx", params);
        },
        getCurrentDriverInfo: function (params, p2, p3) {
            console.log("web端不支持ddcx", params);
        },
        getCurrentOrderStatus: function (params, p2, p3) {
            console.log("web端不支持ddcx", params);
        },
        callApp: function (params: CallAppParam, p2, p3) {
            console.log("web端不支持ddcx", params);
        }


    };
    console.log("注册自定义模块 ddcx");
    weex.registerModule('ddcx', dripTravelModule);
}
