import AbstractFetchAdapter from "fengwuxp_common_fetch/src/adapter/AbstractFetchAdapter";
import {WebFetchOptions} from "fengwuxp_common_fetch/src/adapter/web/WebFetchOptions";
import {FetchResponse} from "fengwuxp_common_fetch/src/FetchOptions";
import {request} from "@tarojs/taro";
import TaroJsHolder, {TaroInterfaceHolder} from "../TaroJsHolder";


/**
 * 基于taro的请求适配器
 */
export default class TaroFetchAdapter extends AbstractFetchAdapter<WebFetchOptions> {

    protected taroHolder: TaroInterfaceHolder;

    constructor() {
        super();
        this.taroHolder = TaroJsHolder.getTaroHolder();
    }

    request = (options: WebFetchOptions): Promise<FetchResponse> => {

        const param = this.buildRequest(options);
        // console.debug("--request options-->", param);
        return this.taroHolder.taro.request(param).then(this.resolveResponse.resolve);
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
            dataType: responseType.toLocaleLowerCase(),
            cache: (cache as any),
            credentials,
            mode: (mode as any),
            //headers HTTP 请求头
            header: headers,
            data,
        } as any;
    };


}