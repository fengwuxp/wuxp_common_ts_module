
import {ProductType} from "./enums/ProductType";
import {RideType} from "./enums/RideType";

/**
 * 订单状态信息
 * @link {http://developer.xiaojukeji.com/doc/_book/remark/trip_status.html}
 */
export interface OrderStatusInfo {

    /**
     * 错误码。0表示请求成功，可以处理返回数据
     */
    errno: number;

    /**
     * 错误原因。正确返回时为空，否则为错误原因
     */
    errmsg: string;


    /**
     * 数据
     */
    data: {
        /**
         * 产品类型
         */
        product_type: ProductType;

        /**
         * 运力类型
         */
        ride_type: RideType;

        /**
         * 订单id
         */
        oid: string;

        /**
         * 订单状态（见行程状态）
         * @link {./OrderStatus}
         */
        status: string;
    }

}