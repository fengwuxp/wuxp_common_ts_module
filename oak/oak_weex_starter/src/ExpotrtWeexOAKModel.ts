import {WeexModule} from "weex";


/**
 * 广播模块
 */
export interface WeexBoradcastModule extends WeexModule {

    register: (category: string,
               eventName: string,
               succFn: (data) => void,
               errorFn?: (data) => void,) => void;

    send: (category: string,
           eventName: string,
           data,
           error?) => void;

    unregister: (category: string, eventName: string) => void;
}

/**
 * 支付宝相关
 */
export interface AliPayModule extends WeexModule {

    auth: (useV2: boolean, data: string, callback: (result: {
        resultStatus: string,
        result: any,
        memo?: string
    }) => void) => void;
}


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

const broadcast: WeexBoradcastModule = weex.requireModule("broadcast");  //自定义广播对象
const cache: any = weex.requireModule("cache");
const appMain: any = weex.requireModule("appMain");
const imageLoader: any = weex.requireModule("image");
const msgPush: any = weex.requireModule("msgPush");
const qrcode: any = weex.requireModule("qrcode");
const common: any = weex.requireModule("common");
const appUpdate: any = weex.requireModule("appUpdate");
const photo: any = weex.requireModule("photo");
const location: any = weex.requireModule("location");
const thirdLogin: any = weex.requireModule("thirdLogin");
const aliPay: AliPayModule = weex.requireModule("aliPay");
const naviMap: NaviMapModule = weex.requireModule("naviMap");

//此处为了导入地方能够进行结构赋值，不能使用 export default

export {
    broadcast,
    cache,
    appMain,
    imageLoader,
    msgPush,
    qrcode,
    common,
    appUpdate,
    photo,
    location,
    thirdLogin,
    aliPay,
    naviMap
}
