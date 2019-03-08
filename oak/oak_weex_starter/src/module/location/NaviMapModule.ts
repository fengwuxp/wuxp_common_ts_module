import {isWeb} from "common_weex/src/constant/WeexEnv";
import {NaviMapModule, OpenMapAppOptions} from "./index";

/**
 * 导航地图相关
 */
if (isWeb) {

    const naviModal: NaviMapModule = {

        /**
         * 获取安装的地图app
         * @param callback
         */
        getInstalledNaviApp: (callback: (map) => void) => {
            console.log("web端暂不支持");
        },

        /**
         * 获取百度地图定位
         * @param coorType
         * @param locationOptions
         * @param success
         * @param failure
         */
        getCurrentLocationByBaidu: (coorType: string, locationOptions: any, success, failure) => {
            console.log("web端暂不支持");
        },


        openNaviMap: (appName: string, dlat: number, dlon: number, dname: string, failure) => {

            // console.log("web端暂不支持");
            failure("web端暂不支持")
        },

        /**
         * 从当前位置导航
         * dlat: number, dlon: number, dname:
         * @param packageName 导航软件包名
         * @param options
         * @param failure
         * @return
         */
        openMapApp(packageName: string, options: OpenMapAppOptions, failure: () => void) {
            console.log("web端暂不支持");
        },
        /**
         * 打开百度地图（公交出行，起点位置使用地图当前位置）
         * <p>
         * mode = transit（公交）、driving（驾车）、walking（步行）和riding（骑行）. 默认:driving
         * 当 mode=transit 时 ： sy = 0：推荐路线 、 2：少换乘 、 3：少步行 、 4：不坐地铁 、 5：时间短 、 6：地铁优先
         *
         * @param action
         * @param options
         * @param failure
         */
        openBaiduMap(action: string, options: OpenMapAppOptions, failure: () => void) {
            console.log("web端暂不支持");
        },

        /**
         * 打开高德地图（公交出行，起点位置使用地图当前位置）
         * <p>
         * t = 0（驾车）= 1（公交）= 2（步行）= 3（骑行）= 4（火车）= 5（长途客车）
         *
         * @param action
         * @param options
         * @param failure
         */
        openGaoDeMap(action: string, options: OpenMapAppOptions, failure: () => void) {
            console.log("web端暂不支持");
        },

        /**
         * 打开腾讯地图（公交出行，起点位置使用地图当前位置）
         * <p>
         * 公交：type=bus，policy有以下取值
         * 0：较快捷 、 1：少换乘 、 2：少步行 、 3：不坐地铁
         * 驾车：type=drive，policy有以下取值
         * 0：较快捷 、 1：无高速 、 2：距离短
         * policy的取值缺省为0
         *
         * @param action
         * @param options
         * @param failure
         */
        openTencent(action: string, options: OpenMapAppOptions, failure: () => void) {
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 naviMap");
    weex.registerModule('naviMap', naviModal);
}
