/**
 * http://developer.xiaojukeji.com/doc/sdk/api/current_driver.html
 *
 * 获取当前订单的司机信息
 */
export interface DriverInfo {

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
        product_type: string;

        /**
         * 运力类型
         */
        ride_type: string;

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
}