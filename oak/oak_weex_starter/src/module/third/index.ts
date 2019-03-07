import {WeexModule} from "weex";


export interface ThirdLoginModule extends WeexModule {

    wxLogin: (params: any, callback: (data:WxAuthResultInfo) => void) => void;
}

export interface WxAuthResultInfo {
    code: string,
    result: string
    error_msg: string;
}