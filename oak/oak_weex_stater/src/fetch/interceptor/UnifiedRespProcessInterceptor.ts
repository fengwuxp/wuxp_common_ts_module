import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import {FetchOptions} from "common_fetch/src/FetchOptions";
import {ApiResp} from "../../../../oak_weex_common/src/model/api/ApiResp";


/**
 * 统一数据处理
 */
export default class UnifiedRespProcessInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    postHandle(data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined {

        const resp: ApiResp = data.data;

        if (resp.code !== 0) {

            return Promise.reject(resp.message);
        }

        let oldTransform = options.transformResponse;

        //响应数据转换
        options.transformResponse = (response: FetchResponse) => {
            if (typeof oldTransform == "function") {
                return oldTransform(resp as any) as any;
            }
            return resp;
        };

        return data;

    }
}