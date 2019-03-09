import {WeexModule} from "weex";
import {MapType} from "../../standardization/dirp/enums/MapType";
import {ProductType} from "../../standardization/dirp/enums/ProductType";

/**
 * 滴滴出行
 */
export interface WeexDripTravelModule extends WeexModule {

    /**
     * 拉起滴滴打车主页面 (h5版本)
     * @param params
     * @param success
     * @param failure
     */
    showDDPage: (params: ShoDDPageParams, success, failure) => void;


    /**
     * http://developer.xiaojukeji.com/doc/sdk/api/app.html
     * 唤醒滴滴客户端，进入主页面，并传递参数
     * @param params
     * @param success
     * @param failure
     */
    callApp: (params: CallAppParam, success, failure) => void;

    /**
     * 打电话
     * @param params
     * @param success
     * @param failure
     */
    callPhone: (params, success, failure) => void;

    /**
     * 获取订单状态
     * @param params
     * @param success
     * @param failure
     */
    getCurrentOrderStatus: (params, success, failure) => void;

    /**
     * 获取司机信息
     * @param params
     * @param success
     * @param failure
     */
    getCurrentDriverInfo: (params, success, failure) => void;

    /**
     * 异步调用滴滴的api
     * @param methodName
     * @param params
     * @param success
     * @param failure
     */
    asyncCallDDApi: (methodName: string, params: any, success: (data) => void, failure: (data) => void) => void;
}

/**
 * @link {http://developer.xiaojukeji.com/doc/sdk/sdk_method.html}
 *
 * 备注：所有的参数都是可选参数。
 * 但如果您App本身已有定位功能，建议在拉起的时候传入经纬度fromlat，fromlng，maptype，WebApp会直接使用传入的定位坐标，省去自身的定位等待，提高页面整体加载速度。
 * SDK会对传入的经纬度做合法性校验（数字格式，精度大于4位小数）,只有经纬度同时合法时才会采用。如果传递经纬度请同时传递经纬度对应的坐标类型maptype以确保滴滴准确识别。
 * addr 为地点的地址，name 为地点的名称。例如，天安门的 addr 地址为东长安街xxx号，而 name 名称为天安门。
 * 如果只传入经纬度，则滴滴会根据传入的经纬度做地点名称反解操作。但如果同时传入了名称与地址，则滴滴会采用传入值。如果未传递经纬度，或者未同时传入地址与名称，
 * 则会忽略传递的地址名称，走滴滴自有反解动作。
 * 如果起始地点未传递，则会使用当前定位地址。如果目的地未传递，则会等待用户填写。
 * 如果您传入了经纬度，请搭配传入准确的maptype，以保证经纬度得到准确的识别与反解。
 * biz 可选的取值为，1：出租车；2：专车；3：快车；4：代驾。
 */
export interface ShoDDPageParams {

    /**
     * 手机号    设置登录默认用户
     */
    phone?: string;

    /**
     * 地图坐标系类型   soso（默认值），
     * wgs，gcj02，baidu，soso，gaode
     */
    maptype?: MapType

    /**
     * 起点纬度    精确到小数点后2位以上
     */
    fromlat?: number;

    /**
     * 起点经度    精确到小数点后2位以上
     */
    fromlng?: number;

    /**
     * 起点名
     */
    fromname?: string;

    /**
     * 起点地址
     */
    fromaddr?: string;

    /**
     * 终点纬度    精确到小数点后2位以上
     */
    tolat: number;

    /**
     * 终点经度    精确到小数点后2位以上
     */
    tolng: number;

    /**
     * 终点名
     */
    toname?: string;

    /**
     * 终点地址
     */
    toaddr?: string;

    /**
     * 渠道号
     */
    channel?: string;

    /**
     * 业务线id    257 - 出租车；
     *            258 - 专车；
     *            260 - 快车；
     *            261 - 代驾；
     *            262 - 巴士
     */
    bizid?: number;
}


export interface CallAppParam {

    /**
     * float    起点位置纬度
     */
    from_lat?: number;

    /**
     * 起点位置经度
     */
    from_lng?: number;

    /**
     * 终点位置纬度
     */
    to_lat: number;

    /**
     * 终点位置经度
     */
    to_lng: number;

    /**
     *    string(可选)    坐标系类型，默认soso，
     */
    map_type?: MapType;

    /**
     * 产品类型
     */
    product_type: ProductType;
}