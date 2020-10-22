import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import {FetchOptions} from "common_fetch/src/FetchOptions";
import StringUtils from "common_utils/src/string/StringUtils";
import {HttpFetchException} from "common_fetch/src/exception/HttpFetchException";
import {ApiResp} from "../../model/api/ApiResp";

/**
 * 统一数据处理
 */
export default class OakUnifiedRespProcessInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    protected toastMethod: (message: string) => Promise<void> | void;


    constructor(toastMethod: (message: string) => (Promise<void> | void)) {
        super();
        this.toastMethod = toastMethod;
    }

    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {

        if (options.useUnifiedTransformResponse === false || data == null) {
            //不使用统一的响应转换
            return data;
        }

        const resp: ApiResp = data.data;
        if (resp == null) {
            return Promise.reject(data);
        }

        if (resp.code !== 0) {
            const message = resp.message;
            if (this.useUnifiedToast(options, message)) {
                // 加入错误提示
                this.toastMethod(message);
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

    };


    postHandleError = (exception: HttpFetchException, options: FetchOptions): HttpFetchException | FetchResponse | Promise<FetchResponse | HttpFetchException> | undefined | null => {
        if (options.useUnifiedTransformResponse !== false) {
            //不使用统一的响应转换
            const message = exception.message || `请求异常 http code：${exception.httpCode}`;
            if (this.useUnifiedToast(options, message)) {
                // 加入错误提示
                this.toastMethod(message);
            }
        }
        return exception.response;
    };

    /**
     * 是否使用统一的错误提示
     * @param options
     * @param message
     */
    private useUnifiedToast = (options: FetchOptions, message: string): boolean => {
        if (options.useUnifiedToast === false || options.useProgressBar === false) {
            return false;
        }
        return StringUtils.hasText(message);
    }
}
