import {ThirdPartyPaymentMethod} from "./ThirdPartyAuthType";
import {aliPay, thirdLogin, weixinPay} from "../../ExpotrtWeexOAKModel";


/**
 * 标准化第三方登录
 */
export interface WeexStandardizeThirdPartyModule {

    /**
     * 鉴权认证
     * @param params
     * @param 返回用于和服务端交换用户数据的 code字符串
     */
    auth: (params: AuthParamInfo) => Promise<string>
}

export interface AuthParamInfo {

    type: ThirdPartyPaymentMethod;

    authParam: any;
}


const standardizeThirdPartyModule: WeexStandardizeThirdPartyModule = {
    auth: ({type, authParam}: AuthParamInfo) => {

        switch (type) {
            case ThirdPartyPaymentMethod.ALIPAY:
                return handleALiAuth(authParam);
            case ThirdPartyPaymentMethod.WEIXIN:
                return handleALiAuth(authParam);
            default:
                Promise.reject({
                    message: `not support: ${type}`
                });
        }
    }


};

/**
 * 处理支付宝登录
 * @param param
 */
const handleALiAuth = (param) => {

    return new Promise<string>((resolve, reject) => {
        aliPay.auth(true, param, (data) => {
            const {resultStatus, result, memo} = data;
            const {result_code} = result;
            if (result_code === "200") {
                resolve(result.auth_code);
            } else {
                reject(data)
            }
        });
    });
};

/**
 * 处理微信登录
 * @param param
 */
const handleWeiXinAuth = (param) => {

    return new Promise<string>((resolve, reject) => {

        thirdLogin.wxLogin(param, (data) => {
            const {code, result} = data;
            if (parseInt(result) !== 0) {
                reject(data);
            } else {
                resolve(code);
            }
        }, reject);
    })
};


export default standardizeThirdPartyModule;