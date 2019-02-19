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
            index++;
            const handle = interceptor.preHandle;
            if (handle == null) {
                continue;
            }
            try {

                result = await handle(result);
            } catch (e) {
                //异常，跳过
                console.error("FetchInterceptorExecutor pre handle exception", e);
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

            let postHandle: Function = interceptor.postHandleCompleted;
            if (postHandle == null) {
                if (fetchError) {
                    //请求错误
                    postHandle = interceptor.postHandleError;
                } else {
                    //请求成功
                    postHandle = interceptor.postHandle;
                }
            }

            if (postHandle == null) {
                continue;
            }


            try {
                result = await postHandle(result, options);
            } catch (e) {
                console.debug("FetchInterceptorExecutor post handle exception", e);
                //异常，中断执行，并抛出错误
                return Promise.reject(e);
            }
        }
        if (fetchError) {
            return Promise.reject(result);
        }
        return result;
    }

}
