import {WeexModule} from "weex";


/**
 * 支付宝相关
 */
export interface ALiPayModule extends WeexModule {

    /**
     * 支付宝 鉴权
     * @param useV2 使用v2
     * @param sign  签名字符串
     * @param callback
     */
    auth: (useV2: boolean, sign: string, callback: (result: {
        resultStatus: string,
        result: ALiPayAuthResultInfo,
        memo?: string
    }) => void) => void;


    /**
     * 设置支付使用沙箱环境
     * @param useSandboxEnv 是否使用沙箱环境
     */
    setSandboxEnv: (useSandboxEnv: boolean) => void;

    /**
     * 支付
     * @param useV2  使用v2
     * @param orderInfo
     * @param callback
     */
    pay: (useV2: boolean, orderInfo: string, callback: (data) => void) => void;
}


export interface ALiPayAuthResultInfo {

    result_code: string;

    alipay_open_id: string;

    user_id: string;

    auth_code: string;
}


export interface WexXinPayModule extends WeexModule {

    pay: (parData: {}, success: (data) => void, failure: (data) => void) => void;
}
