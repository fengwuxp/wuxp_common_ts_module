import AbstractFetchAdapter from "common_fetch/src/adapter/AbstractFetchAdapter";
import {WebFetchOptions} from "common_fetch/src/adapter/web/WebFetchOptions";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import {request} from "@tarojs/taro";


/**
 * 基于taro的请求适配器
 */
export default class TaroFetchAdapter extends AbstractFetchAdapter<WebFetchOptions> {

    private taro: any;


    constructor(taro: any) {
        super();
        this.taro = taro;
    }

    request = (options: WebFetchOptions): Promise<FetchResponse> => {

        const param = this.buildRequest(options);
        console.debug("--request options-->", param);
        return this.taro.request(param).then(this.resolveResponse.resolve);
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
            data,
        };
    };


}