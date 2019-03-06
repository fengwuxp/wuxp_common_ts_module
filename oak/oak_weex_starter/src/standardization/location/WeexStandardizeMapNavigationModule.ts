import {CurrentLocationByBaiduResult, LocalInstallMapAppMap} from "../../module/location";
import {naviMap} from "../../ExpotrtWeexOAKModel";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";

/**
 * 地图导航相关
 */
export interface WeexStandardizeMapNavigationModule {


    /**
     * 获取本地已安装的地图列表
     */
    readonly getInstalledNaviApp: () => Promise<LocalInstallMapAppMap>;


    /**
     * 通过百度地图进行定位
     * @param options
     */
    readonly  getCurrentLocationByBaidu: (options: GetCurrentLocationByBaiduOptions) => Promise<CurrentLocationByBaiduResult>;

    /**
     * 注意 由于这个是打开第三方应用，无法得到明确的成功回调，只会有明确的失败回调
     * 从当前位置导航
     * @param options
     */
    readonly openNaviMap: (options: NavigationOptions) => Promise<void>;

    /**
     * 使用百度地图 从当前位置导航
     * @param options
     */
    readonly openBaiduMap: (options: BaseNavigationOptions) => Promise<void>;

    /**
     * 使用高德地图 从当前位置导航
     * @param options
     */
    readonly openGaoDeMap: (options: BaseNavigationOptions) => Promise<void>;

    /**
     * 使用腾讯地图 从当前位置导航
     * @param options
     */
    readonly openTencent: (options: BaseNavigationOptions) => Promise<void>;
}

export interface GetCurrentLocationByBaiduOptions {

    /**
     * 坐标类型
     */
    coorType?: string,

    /**
     * 定位配置选项
     */
    locationOptions?: {
        [key: string]: string
    },
}

export interface BaseNavigationOptions {

    /**
     * 终点纬度
     */
    dlat: number;

    /**
     * 终点经度
     */
    dlon: number;

    /**
     * 终点名称
     */
    dname: string;
}

export interface NavigationOptions extends BaseNavigationOptions {
    /**
     * 导航软件中文名称，如百度地图
     */
    appCnName: string,
}

const openBaiduMap = (options: BaseNavigationOptions) => {
    return [
        options.dlat,
        options.dlon,
        options.dname
    ];
};
/**
 * 标准化的地图导航模块
 */
export default standardizedWeexModuleToPromise<WeexStandardizeMapNavigationModule>({
    module: naviMap,
    transformParamMap: {
        getCurrentLocationByBaidu: (options: GetCurrentLocationByBaiduOptions) => {
            return [
                options.coorType,
                options.locationOptions
            ];
        },
        getInstalledNaviApp: () => [],
        openNaviMap: (options: NavigationOptions) => {
            return [
                options.appCnName,
                options.dlat,
                options.dlon,
                options.dname
            ];
        },
        openBaiduMap,
        openGaoDeMap: openBaiduMap,
        openTencent: openBaiduMap

    },
    transformCallbackMap: {
        getCurrentLocationByBaidu: (resolve, reject) => [resolve, reject],
        getInstalledNaviApp: (resolve, reject) => [resolve],
        openBaiduMap: (resolve, reject) => [reject],
        openGaoDeMap: (resolve, reject) => [reject],
        openNaviMap: (resolve, reject) => [reject],
        openTencent: (resolve, reject) => [reject]
    }
});