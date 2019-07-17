import {GetEstimatePriceParam, GetEstimatePriceResult} from "./GetEstimatePrice";
import {NewOrderParam, NewOrderResult} from "./NewOrder";
import {DriverInfo} from "./DriverInfo";
import {OrderStatusInfo} from "./OrderStatusInfo";
import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {CallAppParam, ShoDDPageParams} from "../../module/drip";
import {WeexStandardizedModule} from "fengwuxp_common_weex/src/sdk/standardization/WeexStandardizedModule";
import {DripTravelSDKResp} from "./DripTravelSDKResp";

/**
 * @link {http://developer.xiaojukeji.com/doc/sdk.html}
 *
 * 标准化后的滴滴出行sdk能力
 */
export interface WeexDripTravelSDKModule extends WeexStandardizedModule {


    /**
     * http://developer.xiaojukeji.com/doc/sdk/sdk_method.html
     *
     * 注册app
     * @param appId   申请的appid
     * @param secret  申请的appid对应的秘钥
     */
    readonly registerApp: (appId: string, secret: string) => Promise<void>;


    /**
     * 拉起打车页面
     * @param param
     */
    readonly showDDPage: (param: ShoDDPageParams) => Promise<void>;


    /**
     * http://developer.xiaojukeji.com/doc/sdk/api/app.html
     *
     * 唤醒滴滴客户端，进入主页面，并传递参数
     * @param param
     */
    readonly callApp: (param: CallAppParam) => Promise<void>;


    /**
     * http://developer.xiaojukeji.com/doc/sdk/api/price.html
     *
     * 获取预估价格
     * @param param
     */
    readonly getEstimatePrice: (param: GetEstimatePriceParam) => Promise<GetEstimatePriceResult>;


    /**
     * http://developer.xiaojukeji.com/doc/sdk/api/order_request.html
     *
     * 创建滴滴行程
     * @param param
     */
    readonly newOrder: (param: NewOrderParam) => Promise<NewOrderResult>;

    /**
     * http://developer.xiaojukeji.com/doc/_book/remark/trip_status.html
     *
     * 获取当前请求订单状态
     */
    readonly getCurrentOrderStatus: () => Promise<OrderStatusInfo>;

    /**
     * http://developer.xiaojukeji.com/doc/sdk/api/current_driver.html
     *
     * 获取当前订单司机信息
     */
    readonly getCurrentDriverInfo: () => Promise<DriverInfo>;


    /**
     * 拨打电话
     * @param proxyPhone 代理手机号码
     */
    readonly callPhone: (proxyPhone: string) => Promise<void>;

}


const dripTravelSDKModule = standardizedWeexModuleToPromise<WeexDripTravelSDKModule>({
    module: weex.requireModule("ddcx"),
    transformParamMap: {
        getCurrentOrderStatus: () => [{}],
        getCurrentDriverInfo: () => [{}],
        registerApp: (appId: string, secret: string) => {
            return [
                appId,
                secret
            ];
        }
    },

    transformCallbackMap: {
        getCurrentDriverInfo: (resolve, reject) => [
            ({errmsg, errno, data}: DripTravelSDKResp<DriverInfo>) => {
                if (data == null) {
                    reject();
                } else {
                    resolve(data);
                }
            },
            reject
        ]
    },
});

export default dripTravelSDKModule;

