import {isWeb} from "common_weex/src/constant/WeexEnv";
import {LocationModule, LocationResult, RouteOptions} from "./index";

/**
 * 自定义location 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (isWeb) {
    const locationModal: LocationModule = {
        chooseCommunity: function (success: (data: LocationResult) => void, p2: () => void) {
            console.log("浏览器暂不支持该方法");
            success({
                district: "杨桥西路298号",
                address: "福州市鼓楼区杨桥西路298号",
                areaCode: 300,
                latitude: 123.1,
                longitude: 22.23
            } as any);
        },
        getMyLocation: function (forceLocation: number, succ: (resultInfo: LocationResult) => void) {
            console.log("浏览器暂不支持该方法");
            succ({
                district: "杨桥西路298号",
                address: "福州市鼓楼区杨桥西路298号",
                areaCode: 300,
                latitude: 123.1,
                longitude: 22.23
            } as any);
        },
        openRoutePlan: function (routeOptions: RouteOptions, succ: () => void, fail: () => void) {
            console.log("浏览器暂不支持该方法");
            succ();
        }


    };
    console.log("注册自定义模块 location");
    weex.registerModule('location', locationModal);
}
