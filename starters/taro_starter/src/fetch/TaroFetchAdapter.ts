import AbstractFetchAdapter from "common_fetch/src/adapter/AbstractFetchAdapter";
import {WebFetchOptions} from "common_fetch/src/adapter/web/WebFetchOptions";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import {ReqequestMethod} from "common_fetch/src/constant/ReqequestMethod";
import * as Taro from "@tarojs/taro";
import {request} from "@tarojs/taro";


/**
 * 基于taro的请求适配器
 */
export default class TaroFetchAdapter extends AbstractFetchAdapter<WebFetchOptions> {


    request = (options: WebFetchOptions): Promise<FetchResponse> => {

        return Taro.request(this.buildRequest(options)).then((response) => {
            return this.resolveResponse.resolve(response);
        });
    };

    private buildRequest = (options: WebFetchOptions): request.Param<any> => {

        const {
            url,
            data,
            responseType,
            method,
            headers,
            credentials,
            mode,
            cache
        } = options;

        return {
            //请求方法get post
            method,
            //请求url
            url,
            //响应类型,
            dataType: responseType,
            cache: (cache as any),
            credentials,
            mode: (mode as any),
            //headers HTTP 请求头
            header: headers,
            data: (data == null || method === ReqequestMethod.GET) ? null : typeof data === "string" ? data : JSON.stringify(data),
        };
    }

}