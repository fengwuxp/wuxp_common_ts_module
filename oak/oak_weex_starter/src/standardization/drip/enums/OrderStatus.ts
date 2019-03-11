import {Enum} from "oak_common/src/enums/Enum";

/**
 * 订单行程状态
 */
export class OrderStatus {

    static Pending: Enum = {
        name: "Pending",
        ordinal: 0,
        desc: "行程已被接受，派单中"
    };

    static NoDriverAvailable: Enum = {
        name: "NoDriverAvailable",
        ordinal: 1,
        desc: "无司机应答"
    };


    static Accepted: Enum = {
        name: "Accepted",
        ordinal: 2,
        desc: "司机已接单"
    };


    static Arrived: Enum = {
        name: "Accepted",
        ordinal: 3,
        desc: "司机已到达接驾地点"
    };

    static Charging: Enum = {
        name: "Charging",
        ordinal: 4,
        desc: "乘客上车，司机计费"
    };

    static Finished: Enum = {
        name: "Finished",
        ordinal: 5,
        desc: "到达目的地，行程结束"
    };

    static DriverCancelled: Enum = {
        name: "DriverCancelled",
        ordinal: 6,
        desc: "司机取消行程"
    };

    static Reassign: Enum = {
        name: "Reassign",
        ordinal: 7,
        desc: "订单改派（专/快车）"
    };

    static PassengerCancelled: Enum = {
        name: "PassengerCancelled",
        ordinal: 8,
        desc: "乘客取消行程"
    };


    static ServiceCancelled: Enum = {
        name: "ServiceCancelled",
        ordinal: 9,
        desc: "行程被滴滴取消"
    };

    static Paid: Enum = {
        name: "Paid",
        ordinal: 10,
        desc: "行程费用已支付"
    };
}