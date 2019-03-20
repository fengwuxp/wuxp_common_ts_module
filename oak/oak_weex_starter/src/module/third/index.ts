import {WeexModule} from "weex";
import {AuthOptions} from "../../standardization/auth/AuthOptions";


export interface ThirdLoginModule extends WeexModule {

    wxLogin: (params: WxLoginOptions, success: (data: WxAuthResultInfo) => void, failure: (data: string) => void) => void;
}

export interface WxLoginOptions extends AuthOptions{

    /**
     * 微信appId
     */
    appId: string;

    /**
     * 微信app密钥
     */
    appSecret: string;
}

export interface WxAuthResultInfo {
    code: string,
    result: string
    error_msg: string;
}