
import {aliPay, weixinPay} from "../../ExpotrtWeexOAKModel";
import {ThirdPartyPaymentMethod} from "./ThirdPartyPaymentMethod";

/**
 * 标准化第三方支付
 */
export interface WeexStandardizeThirdPartyPaymentModule {


    /**
     * 支付
     * 如果支付失败 返回对应平台的错误码和错误消息 {errorCode,errorMessage}
     * @param param
     */
    pay: (param: PayInfo) => Promise<void>;
}


export interface PayInfo {

    /**
     * 是否使用沙箱环境
     */
    useSandboxEnv?: boolean;

    /**
     * 支付方式
     */
    method: ThirdPartyPaymentMethod;

    payParam: {} | string;
}



const weexStandardizeThirdPartyPaymentModule: WeexStandardizeThirdPartyPaymentModule = {

    pay: ({
              useSandboxEnv,
              method,
              payParam
          }: PayInfo): Promise<void> => {

        switch (method) {
            case ThirdPartyPaymentMethod.APP_ALI_PAY:
                return handleAilPay(payParam as string, useSandboxEnv);
            case ThirdPartyPaymentMethod.APP_WX_PAY:
                return handleWeiXinPay(payParam as string, useSandboxEnv);
            default:
                return Promise.reject({
                    errorCode: -1,
                    errorMessage: `not support:${method}`
                });
        }


    }
};

/**
 * 处理支付宝支付
 * @param signData
 * @param useSandboxEnv
 */
const handleAilPay = (signData: string, useSandboxEnv: boolean) => {

    if (useSandboxEnv === true) {
        aliPay.setSandboxEnv(useSandboxEnv);
    }

    return new Promise<void>((resolve, reject) => {
        aliPay.pay(true, signData, (data) => {
            if (typeof data === "string") {
                data = JSON.parse(data);
            }

            // 9000	订单支付成功
            // 8000	正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
            // 4000	订单支付失败
            // 5000	重复请求
            // 6001	用户中途取消
            // 6002	网络连接出错
            // 6004	支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态

            const {resultStatus, result, memo} = data;


            if (resultStatus === "9000" || resultStatus === "8000" || resultStatus === "6004") {
                resolve();
            } else {
                reject({
                    errorCode: resultStatus,
                    errorMessage: memo
                });
            }
        })
    });

};

/**
 * 处理微信支付
 * @param payParam
 * @param useSandboxEnv
 */
const handleWeiXinPay = (payParam, useSandboxEnv: boolean) => {
    return new Promise<void>((resolve, reject) => {
        weixinPay.pay(payParam,
            () => {
                resolve();
            },
            (data) => {
                if (useSandboxEnv === true) {
                    //沙箱环境
                    resolve();
                } else {
                    const {errCode, errStr} = data;
                    if (errCode === -1) {
                        //错误
                        reject({
                            errorCode: errCode,
                            errorMessage: errStr
                        });
                    }
                }

            }
        )
    });
};


export default weexStandardizeThirdPartyPaymentModule;