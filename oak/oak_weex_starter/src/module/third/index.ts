import {WeexModule} from "weex";


export interface ThirdLoginModule extends WeexModule {

    wxLogin: (params: any, success: (data: WxAuthResultInfo) => void, failure: (data: string) => void) => void;
}

export interface WxAuthResultInfo {
    code: string,
    result: string
    error_msg: string;
}