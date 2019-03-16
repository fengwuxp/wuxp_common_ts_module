import {isWeb} from "common_weex/src/constant/WeexEnv";
import {CurrentLocationByBaiduResult, LocalInstallMapAppMap, NaviMapModule, OpenMapAppOptions} from "./index";
import {CoordinateType} from "./CoordinateType";

/**
 * 导航地图相关
 */
if (isWeb) {

    const naviModal: NaviMapModule = {
        getCurrentLocationByBaidu: function (p1: CoordinateType, p2: any, p3: (result: CurrentLocationByBaiduResult) => void, p4) {
            console.log("web端暂不支持");
        },
        getInstalledNaviApp: function (p1: (map: LocalInstallMapAppMap) => void) {
            console.log("web端暂不支持");
        },
        openBaiduMap: function (p1: string, p2: OpenMapAppOptions, p3: () => void) {
            console.log("web端暂不支持");
        },
        openBaiduMarker: function (p1: CoordinateType, p2: string, p3: () => void) {
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
