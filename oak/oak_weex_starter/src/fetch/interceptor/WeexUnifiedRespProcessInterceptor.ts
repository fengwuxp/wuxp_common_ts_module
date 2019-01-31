import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import {FetchOptions} from "common_fetch/src/FetchOptions";
import {ApiResp} from "oak_weex_common/src/model/api/ApiResp";
import StringUtils from "common_utils/src/string/StringUtils";
import {weexToast} from "common_weex/src/toast/WeexToast";

/**
 * 统一数据处理
 */
export default class WeexUnifiedRespProcessInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {
        if (options.useUnifiedTransformResponse === false) {
            //不使用统一的响应转换
            return data;
        }
        const resp: ApiResp = data.data;

        if (resp.code !== 0) {

            const message = resp.message;
            const useUnifiedToast = StringUtils.hasText(message) && (options.useUnifiedToast !== false || options.useProgressBar !== false);
            if (useUnifiedToast) {
                // 加入错误提示
                weexToast(message);
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