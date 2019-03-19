import {WeexModule} from "weex";
import {CoordinateType} from "./CoordinateType";
import {LocationRouteModel} from "./LocationRouteModel";

/**
 * 打开第三方地图app导航相关
 */
export interface NaviMapModule extends WeexModule {
    /**
     * 获取安装的地图app
     * @param callback
     */
    getInstalledNaviApp: (callback: (map: LocalInstallMapAppMap) => void) => void;

    /**
     * 获取百度地图定位
     * @param coorType          坐标系类型
     * @param locationOptions
     * @param success
     * @param failure
     */
    getCurrentLocationByBaidu: (coorType: CoordinateType,
                                locationOptions: any,
                                success: (result: CurrentLocationByBaiduResult) => void,
                                failure) => void;


    /**
     * 百度地图大点
     * @param coorType
     * @param data     格式 [{"latitude":0.0,"longitude":0.0,"title":"xxxxx"}]
     * @param callback
     */
    openBaiduMarker: (coorType: CoordinateType, data: BaiduMarkerOptions[], callback: () => void) => void;


    /**
     * 从当前位置导航
     * @param appName
     * @param dlat
     * @param dlon
     * @param dname
     * @param failure
     */
    openNaviMap: (appName: string, dlat: number, dlon: number, dname: string, failure) => void;
    /**
     * 从当前位置导航
     *
     * @param packageName 导航软件包名
     * @param options
     * @param failure
     * @return
     */
    openMapApp: (packageName: string, options: OpenMapAppOptions, failure: () => void) => void;

    /**
     * 打开百度地图（公交出行，起点位置使用地图当前位置）
     * <p>
     * mode = transit（公交）、driving（驾车）、walking（步行）和riding（骑行）. 默认:driving
     * 当 mode=transit 时 ： sy = 0：推荐路线 、 2：少换乘 、 3：少步行 、 4：不坐地铁 、 5：时间短 、 6：地铁优先
     *
     * @param dlat  终点纬度
     * @param dlon  终点经度
     * @param failure
     */
    openBaiduMap: (action: string, options: OpenMapAppOptions, failure: () => void) => void;

    /**
     * 打开高德地图（公交出行，起点位置使用地图当前位置）
     * <p>
     * t = 0（驾车）= 1（公交）= 2（步行）= 3（骑行）= 4（火车）= 5（长途客车）
     *
     * @param action  终点纬度
     * @param options
     * @param failure
     */
    openGaoDeMap: (action: string, options: OpenMapAppOptions, failure: () => void) => void;

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
    openTencent: (action: string, options: OpenMapAppOptions, failure: () => void) => void;
}


export interface OpenMapAppOptions {
    dlat: string,
    dlon: string,
    dname: string
}

/**
 * 本机安装的地图app 列表
 */
export interface LocalInstallMapAppMap {

    /**
     * 百度地图
     */
    baiduMap?: string;

    /**
     * 百度地图
     */
    gaodeMap?: string;

    /**
     * 百度地图
     */
    tencentMap?: string;
}


export interface CurrentLocationByBaiduResult {

    /**
     * 坐标系类型
     */
    coorType: CoordinateType;

    /**
     * 纬度
     */
    latitude: number | string;

    /**
     * 经度
     */
    longitude: number | string;

    label: string;

    /**
     * 城市名称
     */
    cityName: string;
}


/**
 * 定位模块
 */
export interface LocationModule extends WeexModule {

    /**
     * 获取我的位置信息
     * @param forceLocation
     * @param succ 成功回调  {"district":"街道","address":"详细地址","latitude":123.99,"longitude":36.99}
     * @param fail 失败回调
     */
    getMyLocation: (forceLocation: number, succ: (resultInfo: LocationResult) => void) => void;


    /**
     * 打开导航路线
     * @param params
     * @param succ
     * @param fail
     */
    openRoutePlan: (params: RouteOptions, succ: () => void, fail: () => void) => void;


    /**
     * 打开选择小区
     * @param success
     * @param failure
     */
    chooseCommunity: (success: (data: LocationResult) => void, failure: () => void) => void;
}

/**
 * 定位结果信息
 */
export interface LocationResult {


    /**
     * 区/县
     */
    district: string;

    /**
     * 详细地址
     */
    address: string;

    /**
     * 城市
     */
    city: string;


    /**
     * 纬度
     */
    latitude: number;

    /**
     * 精度
     */
    longitude: number;

    /**
     * 省份
     */
    province: string;


    /**
     * 第三方城市编码，不同的定位平台可能不同，或没有
     */
    areaCode?: string | number;

    /**
     * 街道
     */
    street: string;

    /**
     * 街道号
     */
    streetNumber: string;
}


/**
 * 百度地图打点配置
 */
export interface BaiduMarkerOptions {

    /**
     * 纬度
     */
    latitude: number;

    /**
     * 经度
     */
    longitude: number;

    /**
     * 名称
     */
    title: string
}


export interface RouteOptions {


    /**
     * 模式
     */
    mode: LocationRouteModel;

    /**
     * 地址
     */
    address: string;

    /**
     * 起点纬度
     */
    slat: number;

    /**
     * 起点经度
     */
    slng: number;

    /**
     * 目标纬度
     */
    dlat: number;

    /**
     * 目标精度
     */
    dlng: number;


}