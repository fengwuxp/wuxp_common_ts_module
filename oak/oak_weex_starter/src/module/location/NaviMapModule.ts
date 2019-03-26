import {isWeb} from "common_weex/src/constant/WeexEnv";
import {
    BaiduMarkerOptions,
    CurrentLocationByBaiduResult,
    LocalInstallMapAppMap,
    NaviMapModule,
    OpenMapAppOptions
} from "./index";
import {CoordinateType} from "./CoordinateType";

/**
 * 导航地图相关
 */
if (isWeb) {

    const naviModal: NaviMapModule = {
        getCurrentLocationByBaidu: function (coorType: CoordinateType,
                                             locationOptions: any,
                                             success: (result: CurrentLocationByBaiduResult) => void, failure) {
            console.log("web端暂不支持");

        },
        getInstalledNaviApp: function (callback: (map: LocalInstallMapAppMap) => void) {
            console.log("web端暂不支持");
            callback({
                baiduMap: "百度地图",
                tencentMap: "腾讯地图",
            })
        },
        openBaiduMap: function (p1: string, p2: OpenMapAppOptions, p3: () => void) {
            console.log("web端暂不支持");
        },
        openBaiduMarker: function (coorType: CoordinateType, data: BaiduMarkerOptions[], callback: (options: BaiduMarkerOptions) => void) {
            console.log("web端暂不支持");
        },
        openGaoDeMap: function (p1: string, p2: OpenMapAppOptions, p3: () => void) {
            console.log("web端暂不支持");
        },
        openMapApp: function (p1: string, p2: OpenMapAppOptions, p3: () => void) {
            console.log("web端暂不支持");
        },
        openNaviMap: function (p1: string, p2: number, p3: number, p4: string, p5) {
            console.log("web端暂不支持");
        },
        openTencent: function (p1: string, p2: OpenMapAppOptions, p3: () => void) {
            console.log("web端暂不支持");
        }


    };
    console.log("注册自定义模块 naviMap");
    weex.registerModule('naviMap', naviModal);
}
