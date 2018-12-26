import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import {FetchOptions} from "common_fetch/src/FetchOptions";
import {ApiResp} from "oak_weex_common/src/model/api/ApiResp";
import StringUtils from "common_utils/src/string/StringUtils";

/**
 * 统一数据处理
 */
export default class WeexUnifiedRespProcessInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {

        const resp: ApiResp = data.data;

        if (resp.code !== 0) {


            if (StringUtils.hasText(resp.message) && (options.useUnifiedToast !== false || options.useProgressBar == false)) {
                //TODO 加入错误提示
            }

            return Promise.reject(resp);
        }

        const transformResponse = options.transformResponse;

        //设置默认的响应数据转换
        options.transformResponse = (response: FetchResponse) => {
            let result = null;
            if (typeof transformResponse == "function") {
                //将原始响应传递给 transformResponse
                result = transformResponse(response);
            } else {
                //默认返回服务中的data
                result = resp.data;
            }
            return result;
        };

        return data;

    }
}