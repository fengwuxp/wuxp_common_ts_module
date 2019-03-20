import {ThirdPartyAuthType} from "./ThirdPartyAuthType";
import {aliPay, thirdLogin, weixinPay} from "../../ExpotrtWeexOAKModel";
import {WxLoginOptions} from "../../module/third";
import {AuthOptions} from "./AuthOptions";


/**
 * 标准化第三方登录
 */
export interface WeexStandardizeThirdPartyModule {

    /**
     * 鉴权认证
     * @param params
     * @return 返回用于和服务端交换用户数据的 code字符串
     */
    auth: (params: AuthParamInfo) => Promise<string>
}

export interface AuthParamInfo {

    /**
     * 第三方
     */
    type: ThirdPartyAuthType;

    /**
     * 获取鉴权配置，微信必须要
     */
    getAuthOptions?: (type: ThirdPartyAuthType) => Promise<AuthOptions> | AuthOptions;
}


const standardizeThirdPartyModule: WeexStandardizeThirdPartyModule = {
    auth: async ({type, getAuthOptions}: AuthParamInfo) => {

        let authOptions: AuthOptions;
        if (getAuthOptions != null) {
            authOptions = await getAuthOptions(type);
        }

        switch (type) {
            case ThirdPartyAuthType.ALI_PAY:
                return handleALiAuth(authOptions);
            case ThirdPartyAuthType.WE_CHAT:
                return handleALiAuth(authOptions);
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
const handleWeiXinAuth = (param: WxLoginOptions) => {

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