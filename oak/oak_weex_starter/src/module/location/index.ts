import {WeexModule} from "weex";

/**
 * 打开第三方地图app导航相关
 */
export interface NaviMapModule extends WeexModule {
    /**
     * 获取安装的地图app
     * @param callback
     */
    getInstalledNaviApp: (callback: (map) => void) => void;

    /**
     * 获取百度地图定位
     * @param coorType
     * @param locationOptions
     * @param success
     * @param failure
     */
    getBaiduLocation: (coorType: string, locationOptions: any, success, failure) => void;

    /**
     * 从当前位置导航
     *
     * @param appCnName 导航软件中文名称，如百度地图
     * @param dlat      终点纬度
     * @param dlon      终点经度
     * @param dname     终点名称
     * @param failure
     * @return
     */
    openNaviMap: (appCnName: string, dlat: number, dlon: string, dname: string, failure) => void;

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
    openBaiduMap: (dlat: number, dlon: string, dname: string, failure) => void;

    /**
     * 打开高德地图（公交出行，起点位置使用地图当前位置）
     * <p>
     * t = 0（驾车）= 1（公交）= 2（步行）= 3（骑行）= 4（火车）= 5（长途客车）
     *
     * @param dlat  终点纬度
     * @param dlon  终点经度
     * @param dname 终点名称
     * @param dname 终点名称
     * @param failure
     */
    openGaoDeMap: (dlat: number, dlon: string, dname: string, failure) => void;

    /**
     * 打开腾讯地图（公交出行，起点位置使用地图当前位置）
     * <p>
     * 公交：type=bus，policy有以下取值
     * 0：较快捷 、 1：少换乘 、 2：少步行 、 3：不坐地铁
     * 驾车：type=drive，policy有以下取值
     * 0：较快捷 、 1：无高速 、 2：距离短
     * policy的取值缺省为0
     *
     * @param dlat  终点纬度
     * @param dlon  终点经度
     * @param dname 终点名称
     * @param failure
     */
    openTencent: (dlat: number, dlon: string, dname: string, failure: Function) => void;
}

/**
 * 定位模块
 */
export interface LocationModule extends WeexModule {

    /**
     * 获取我的位置信息
     * @param flag
     * @param succ 成功回调  {"district":"街道","address":"详细地址","latitude":123.99,"longitude":36.99}
     * @param fail 失败回调
     */
    getMyLocation: (flag: number, succ: (resultInfo: LocationResult) => void) => void;


    /**
     * Map={"mode":1,"address":"地址","slat":"起点纬度","slng":"起点经度","dlat":"目标纬度","dlng":"目标经度"}
     * mode:1、2、3，分别表示公交、驾车和步行
     * address:可空
     * 坐标double型，起点坐标不传
     * @param params
     * @param succ
     * @param fail
     */
    openRoutePlan: (params: any, succ: () => void, fail: () => void) => void;
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