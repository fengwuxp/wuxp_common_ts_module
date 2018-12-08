import {FetchAdapter} from "../FetchAdapter";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {FetchResp, RequestReq} from "weixin/src/minapp/network/request";
import {isNullOrUndefined, isString} from "util";
import {ReqMethod} from "../../constant/ReqMethod";


/**
 * 微信小程序 fetch adapter
 */
export default class WXMinAppAdapter implements FetchAdapter {


    request = (options: FetchOptions): Promise<FetchResponse> => {

        return new Promise<FetchResponse>((resolve, reject) => {
            const req = this.buildRequest(options);
            // @ts-ignore
            wx.request({
                ...req,
                // success: (response: FetchResp) => {
                //     // if (response.statusCode>=200 && response.statusCode<=300) {
                //     //
                //     // }
                //     const {header, data, statusCode} = response;
                //     resolve({
                //         headers: header,
                //         data,
                //         httpCode: statusCode,
                //         success: true
                //     });
                // },
                // fail: (response: FetchResp) => {
                //     const {header, data, statusCode} = response;
                //     reject({
                //         headers: header,
                //         data,
                //         httpCode: statusCode,
                //         success: false
                //     });
                // },
                complete: (response: FetchResp) => {
                    const ok = response.statusCode >= 200 && response.statusCode <= 300;
                    const {header, data, statusCode} = response;
                    resolve({
                        headers: header,
                        data: data || response,
                        status: statusCode,
                        ok
                    });
                },
            });
        });
    };

    private buildRequest = (options: FetchOptions): RequestReq => {

        const {
            url,
            data,
            dataType,
            method,
            headers
        } = options;


        // const _dataType: string = dataType;
        return {
            //请求方法get post
            method,
            //请求url
            url,
            //响应类型,
            dataType,
            //headers HTTP 请求头
            header: headers,
            data: (data == null || method === ReqMethod.GET) ? null : typeof data === "string" ? data : JSON.stringify(data),
        };
    }

}
