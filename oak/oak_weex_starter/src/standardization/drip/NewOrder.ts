/**
 * @link {http://developer.xiaojukeji.com/doc/sdk/api/order_request.html}
 *
 * 创建滴滴行程
 */
import {RideType} from "./enums/RideType";
import {ProductType} from "./enums/ProductType";
import {MapType} from "./enums/MapType";


export interface NewOrderParam {

    /**
     * 接入方订单id，必须提供，防止重复发单，每个用户（手机号）默认只能有一个进行中（即计费中）的行程
     */
    oid: string;


    /**
     * （可选）    第三方传入的标记字段，长度限制为64位（过长则截取），在查询或者回调行程信息时会带上，不做任何修改
     */
    remark?: string;

    /**
     * json类型    {"product_type":"private-car","ride_type":"compact"}必须包含产品类型和运力类型
     */
    product: {
        /**
         * 产品类型
         */
        product_type: ProductType;

        /**
         * 运力类型
         */
        ride_type: RideType;
    };

    /**
     * json类型
     * {
     *     "phone":"13900000000",
     *     "name":"张三",
     *     "lng":116.312615,
     *     "lat":40.058922
     * }
     *     乘客相关数据，电话，姓名（可选），当前位置坐标（平台接入时可选，接入滴滴反作弊时必须）
     */
    passenger: {
        /**
         * 手机号
         */
        phone: string;

        /**
         * （可选）    姓名
         */
        name?: string;

        /**
         * （平台可选）    经度
         */
        lng: string;
        /**
         * （平台可选）    纬度
         */
        lat: string;
    };


    /**
     *
     * json类型
     * {
     *     "user_id":"123456789",
     *     "name":"张三","phone":
     *     "13900000001","openid":
     *     "2088902330753740"
     * }
     *  叫车人信息，用户在第三方平台的id，电话（与乘车人相同时可选），姓名（可选），openid（可选），
     *  如果平台无法提供用户的设备信息，则在滴滴审核通过之后，可以使用叫车人在第三方平台的个人信息。
     *  openid：真身idtype：openid类型，默认1：支付宝，2：百度type：1（默认）支付宝openid，若接入方开通支付宝真身未支付订单校验，必传。
     *  开通此功能需要提前申请权限。
     */
    user: {

        /**
         * 用户在第三方平台的id
         */
        user_id: string;


        /**
         * 电话（与乘车人相同时可选）
         */
        phone: string;

        /**
         * （可选）    姓名（可选）
         */
        name: string;

        /**
         * （可选）    真身id
         */
        openid?: string;

        /**
         * （可选）openid类型，默认1：支付宝，2：百度type：1（默认）支付宝openid，若接入方开通支付宝真身未支付订单校验，必传。
         * 开通此功能需要提前申请权限
         */
        type?: string;
    };


    /**
     * json类型
     * {
     *   "lng":116.312615,
     *   "lat":40.058922,
     *   "name":"西二旗地铁站","address":"上地十街"
     * }
     *   接驾地点信息
     */
    origin: {

        /**
         * 经度
         */
        lng: string;

        /**
         * 纬度
         */
        lat: string;

        /**
         * 地名
         */
        name: string;

        /**
         * （可选）    地址
         */
        address: string;
    };

    /**
     * json类型
     * {
     *    "lng":116.344434,
     *    "lat":39.998568,
     *    "name":"五道口购物中心",
     *    "address":"成府路"
     * }
     * 目的地信息
     */
    destination: {

        /**
         * 经度
         */
        lng: string;

        /**
         * 纬度
         */
        lat: string;

        /**
         * 地名
         */
        name: string;

        /**
         * （可选）    地址
         */
        address: string;
    };

    /**
     * json类型
     * {
     * "imei":"123we125",
     * "suuid":"123juuiuiausd",
     * "network":"WIFI",
     * "wifi_name":
     * "tp_link123",
     * "wifi_ip":"10.10.10.10",
     * "wifi_mac":"aasdasd"
     * }
     * imei/suuid：
     * 必须存在一个deviceid：
     * 设备idip：设备ip地址，
     * 接入滴滴反作弊时必须network：
     * 如果network为wifi，wifi_name，wifi_ip，wifi_mac必须提供
     */
    device: {

        /**
         * 必须存在一个
         */
        imei?: string;

        /**
         * 必须存在一个
         */
        suuid?: string;

        /**
         * （可选）    设备id
         */
        deviceid?: string;

        /**
         * （可选，wifi/2G/3G/4G）
         */
        network: "wifi" | "2G" | "3G" | "4G";

        /**
         * 设备ip地址，接入滴滴反作弊时必须
         */
        ip?: string;

        /**
         * （可选）    network=wifi，必填
         */
        wifi_name?: string;

        /**
         * （可选）    network=wifi，必填
         */
        wifi_ip?: string;

        /**
         * （可选）    network=wifi，必填
         */
        wif_mac?: string;
    };

    /**
     * （可选，接入滴滴反作弊时必须）
     * 2016-03-01T10:00:00+0800
     * 用户请求接入方服务的时间，
     * 默认为当前时间，支持ISO8601格式和timestamp格式
     */
    create_time?: string | number;

    /**
     * string（可选）
     * 2016-03-01T10:00:00+0800用户选择的出行时间，
     * 默认为当前时间，支持ISO8601格式和timestamp格式
     */
    departure_time?: string | number;

    /**
     * （出租车业务无需提供）
     * 费用预估id，
     * 有效时间2分钟用户使用滴滴非出租车服务必须先预估行程费用，
     * 此id在预估价格时下发，必须在请求行程时上传，用户请求行程时候的信息和预估时候的信息必须一致，
     * 出行时间与预估时候的时间误差不得大于5分钟
     */
    estimate_id?: string;

    /**
     * (可选)  坐标系类型，默认soso，支持坐标系见备注
     */
    map_type?: MapType;

    /**
     * （可选）订单类别，3航班接机，4航班送机，5列车接站，6列车送站注：如果不能提供航班号/列车号和出发时间，本字段请勿赋值
     */
    o_type?: number;

    /**
     * （o_type为空时可选，否则必须提供）    航班号/列车号
     */
    traffic_no?: string;

    /**
     * （o_type为空时可选，否则必须提供）    航班/列车出发日期，Y-m-d：2016-08-30
     */
    traffic_dat?: string;

    /**
     * (可选)    支持按航班/列车的到达时间提交数据0：traffic_date为出发时间1：traffic_date为到达时间
     */
    date_type?: number;

    /**
     * json类型（可选）
     * {
     * "tag":1,
     * "add_price":1000
     * }
     * 出租车发单额外信息
     */
    taxi_info?: {

        /**
         * (可选)
         * tag:是否打表来接，1表示打表接，其它表示不打表
         */
        tag: number;

        /**
         * (可选)
         * add_price:出租车调度费，单位为分，只支持100的倍数，最大为500
         */
        add_price: number;
    };

    /**
     * (可选)    tag:是否打表来接，1表示打表接，其它表示不打表
     */
    tag?: string;

    /**
     * (可选)    add_price:出租车调度费，单位为分，只支持100的倍数，最大为5000
     */
    add_price?: string;

    /**
     * json类型（可选）
     * {
     * "amount":10000,
     * "saving":2000,
     * "coupon":2000
     * }，
     * 乘客支付的费用详情，计量单位必须是分，包括：总价、减免金额，券优惠金额，总价必须>=0，优惠减免金额必须<=总价注：本字段仅对开放优惠权限的接入方有效
     */
    price: {
        /**
         * (必须)    总价
         */
        amount?: number;

        /**
         * (可选)    券优惠金额
         */
        coupon?: number;

        /**
         * (可选)    减免金额
         */
        saving?: number;
    };

    /**
     * (必须)    总价
     * 通过预估价钱接口获取
     */
    amount: number;

    /**
     * (可选)    券优惠金额
     */
    coupon?: string;

    /**
     * (可选)    减免金额
     */
    saving?: string;
}


/**
 * 创建滴滴行程结果
 */
export interface NewOrderResult {

    /**
     * 第三方订单id（如果提供了）
     */
    oid: string;

    /**
     * 滴滴订单id
     */
    didi_oid: string;

    /**
     * 行程状态（见备注）
     */
    status: string;

    /**
     * 产品类型
     */
    product_type: ProductType;

    /**
     * 运力类型
     */
    ride_type: RideType;
}

