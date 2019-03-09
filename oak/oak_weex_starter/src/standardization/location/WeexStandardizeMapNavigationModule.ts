import {CurrentLocationByBaiduResult, LocalInstallMapAppMap} from "../../module/location";
import {naviMap} from "../../ExpotrtWeexOAKModel";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {CoordinateType} from "../../module/location/CoordinateType";

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
    readonly getCurrentLocationByBaidu: (options: GetCurrentLocationByBaiduOptions) => Promise<CurrentLocationByBaiduResult>;

    /**
     * 注意 由于这个是打开第三方应用，无法得到明确的成功回调，只会有明确的失败回调
     * 从当前位置导航
     * @param options
     */
    readonly openNaviMap: (options: NavigationOptions) => Promise<void>;

    // /**
    //  * 使用百度地图 从当前位置导航
    //  * @param options
    //  */
    // readonly openBaiduMap: (options: BaseNavigationOptions) => Promise<void>;
    //
    // /**
    //  * 使用高德地图 从当前位置导航
    //  * @param options
    //  */
    // readonly openGaoDeMap: (options: BaseNavigationOptions) => Promise<void>;
    //
    // /**
    //  * 使用腾讯地图 从当前位置导航
    //  * @param options
    //  */
    // readonly openTencent: (options: BaseNavigationOptions) => Promise<void>;
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
    targetLatitude: number;

    /**
     * 终点经度
     */
    targetLongitude: number;

    /**
     * 终点名称
     */
    targetName: string;
}

export interface NavigationOptions extends BaseNavigationOptions {
    /**
     * 导航软件包名
     */
    packageName: string,

    /**
     * 默认 CoordinateType.BD_09
     * 坐标系类型
     */
    coordinate?: CoordinateType;
}

const openBaiduMap = (options: BaseNavigationOptions) => {
    return [
        "",
        {}
    ];
};

/**
 * 地图名称和模块方法名称的映射关系
 */
// const MAP_NAME_TO_METHOD_NAME_MAP = {
//     "百度地图": "openBaiduMap",
//     "高德地图": "openGaoDeMap",
//     "腾讯地图": "openTencent",
// };

/**
 * 通过地图名称获取模块打开地图能力的方法名称
 * @param mapName
 */
// export const getModuleOpenRouteMethodNameByMapName = (mapName: string) => {
//
//     return MAP_NAME_TO_METHOD_NAME_MAP[mapName]
// };

const weexStandardizeMapNavigationModule: WeexStandardizeMapNavigationModule = standardizedWeexModuleToPromise<WeexStandardizeMapNavigationModule>({
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
                options.packageName,
                options.coordinate || CoordinateType.BD_09,
                options.targetLongitude,
                options.targetLatitude,
                options.targetName
            ];
        },
        // openMapApp: (options: NavigationOptions) => {
        //     const params=openBaiduMap(options);
        //     params[0]=options.packageName;
        //     return params;
        // },
        // openBaiduMap,
        // openGaoDeMap: openBaiduMap,
        // openTencent: openBaiduMap

    },
    transformCallbackMap: {
        // getCurrentLocationByBaidu: (resolve, reject) => [resolve, reject],
        getInstalledNaviApp: (resolve, reject) => [resolve],
        openNaviMap: (resolve, reject) => [reject],
        // openBaiduMap: (resolve, reject) => [reject],
        // openGaoDeMap: (resolve, reject) => [reject],
        // openMapApp: (resolve, reject) => [reject],
        // openTencent: (resolve, reject) => [reject]
    }
});
/**
 * 标准化的地图导航模块
 */
export default weexStandardizeMapNavigationModule;