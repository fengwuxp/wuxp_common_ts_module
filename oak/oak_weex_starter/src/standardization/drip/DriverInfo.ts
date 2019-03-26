import {ProductType} from "./enums/ProductType";
import {RideType} from "./enums/RideType";

/**
 * http://developer.xiaojukeji.com/doc/sdk/api/current_driver.html
 *
 * 获取当前订单的司机信息
 */
export interface DriverInfo {

    /**
     * 司机姓名
     */
    name: string;

    /**
     * 司机等级
     * 例如：5.00
     */
    level: string;
    /**
     * 产品类型
     */
    product_type: ProductType;

    /**
     * 运力类型
     */
    ride_type: RideType;

    /**
     * 头像url
     */
    headimg?: string,

    /**
     * 车牌
     */
    card: string,

    /**
     * 手机号码的中间号
     */
    phone: string,

    /**
     * 用于显示的手机号码
     * 例如：137*****567
     */
    phone_display: string
}