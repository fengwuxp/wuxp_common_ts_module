import {WeexModule} from "weex";


/**
 * 支付宝相关
 */
export interface AliPayModule extends WeexModule {

    auth: (useV2: boolean, data: string, callback: (result: {
        resultStatus: string,
        result: any,
        memo?: string
    }) => void) => void;
}
