/**
 * @link {http://developer.xiaojukeji.com/doc/sdk/api/price.html}
 * 获取预估价格
 */
import {MapType} from "./enums/MapType";
import {ProductType} from "./enums/ProductType";
import {RideType} from "./enums/RideType";


export interface GetEstimatePriceParam {

    /**
     * string（可选）    手机imei
     */
    imei: string;

    /**
     * 起点纬度
     */
    start_lat: number;

    /**
     * 起点经度
     */
    start_lng: number;

    /**
     * 出发地名称
     */
    from_name: string;

    /**
     * 终点纬度
     */
    end_lat: number;

    /**
     * 终点经度
     */
    end_lng: number;

    /**
     * 目的地名称
     */
    to_name: string;

    /**
     * 产品类型
     */
    product_type: string;

    /**
     * 运力类型
     */
    ride_type: string

    /**
     * （可选）    坐标系类型，支持坐标系：baidu/wgs/soso
     */
    map_type: MapType;

    /**
     * （可选）    出行时间，出行时间不同，预估价格不同，默认为当前时间
     */
    departure_time: string;
}


/**
 * 获取预估价格结果
 */
export interface GetEstimatePriceResult {


    /**
     * 产品类型
     */
    product_type: ProductType;

    /**
     * 运力类型
     */
    ride_type: RideType

    /**
     * 货币类型（CNY：人民币）
     */
    currency_code: string;

    /**
     * 预估价格，单位：分
     */
    estimate_price: number;

    /**
     * 行程预估耗时，单位：秒
     */
    time_in_second: number;

    /**
     * 预估里程，单位：米
     */
    distance_in_meter: number;

    /**
     * 车型
     */
    car_type: number;

    /**
     * 动调倍数，只在登录后返回真实动调倍数
     */
    dynamic: number;

    /**
     * 价格预估id，在请求行程时必须携带
     */
    estimate_id: string

    /**
     * 跳转到端的链接
     */
    jump_url: string;

    /**
     * 下载端的链接
     */
    download_url: string;

    /**
     * 0 - 未开通，1 - 拼车无拼座，2 - 支持拼车拼座
     */
    carpool_tag: number;

    /**
     * json类型    拼车拼座信息，[{"seat":1,"estimate_price":2340},{"seat":2,"estimate_price":2540}]
     */
    carpool_info?: Array<{
        /**
         * （支持拼座时返回）    拼座数
         */
        seat: number;
        /**
         * 拼车拼座预估价
         */
        estimate_price: number;
    }>

}