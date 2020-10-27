import {FetchInterceptor} from "./FetchInterceptor";
import {BaseFetchOptions} from "../BaseFetchOptions";
import {FetchResponse} from "../FetchOptions";

/**
 * 拦截器执行器
 */
export default class FetchInterceptorExecutor {

    /**
     * 拦截器列表
     */
    private interceptorList: FetchInterceptor[];


    constructor(interceptorList: FetchInterceptor[]) {
        this.interceptorList = interceptorList;
    }


    preHandle(params: BaseFetchOptions): Promise<BaseFetchOptions | null | undefined> {
        return this.executePreHandle(params);
    }

    /**
     * 请求后置处理器
     * @param response
     * @param options
     * @param fetchError
     */
    postHandle(response: FetchResponse, options: BaseFetchOptions, fetchError: boolean): Promise<FetchResponse | null | undefined> {
        return this.executePostHandle(response, options, fetchError);
    }


    /**
     * 执行拦截器前置处理
     * @param options
     */
    private async executePreHandle(options: BaseFetchOptions): Promise<BaseFetchOptions | null | undefined> {
        const interceptorList = this.interceptorList;
        let index = 0;
        let result: BaseFetchOptions = options;
        while (index < interceptorList.length) {
            const interceptor = interceptorList[index];
            if (interceptor == null) {
                continue
            }
            index++;
            if (typeof interceptor.preHandle == "function") {
                try {
                    result = await interceptor.preHandle(result);
                } catch (e) {
                    //异常，跳过
                    console.error("FetchInterceptorExecutor pre handle");
                }
            }
        }
        return result;
    }

    /**
     * 执行拦截器后置处理
     * @param data
     * @param options
     * @param fetchError 请求是否发生错误
     */
    private async executePostHandle(data: FetchResponse, options: BaseFetchOptions, fetchError: boolean): Promise<FetchResponse | null | undefined> {
        const interceptorList = this.interceptorList;
        let index = 0;

        let result: FetchResponse = data;
        while (index < interceptorList.length) {
            let interceptor = interceptorList[index];
            index++;
            if (interceptor == null) {
                continue
            }
            if (typeof interceptor.postHandleCompleted == "function") {
                result = await interceptor.postHandleCompleted(result, options);
                continue;
            }
            if (fetchError) {
                //请求错误
                if (typeof interceptor.postHandleError == "function") {
                    result = await interceptor.postHandleError(result, options) as any;
                }
            } else {
                //请求成功
                if (typeof interceptor.postHandle == "function") {
                    result = await interceptor.postHandle(result, options);
                }
            }
        }
        if (fetchError) {
            return Promise.reject(result);
        }
        return result;
    }

}
