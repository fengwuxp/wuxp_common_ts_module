import {FetchInterceptor} from "./FetchInterceptor";
import {BaseFetchOptions} from "../BaseFetchOptions";
import {FetchResponse} from "../fetch/FetchOptions";
import {ExecuteMethod} from "../enums/ExecuteMethod";
import {isNullOrUndefined} from "util";

/**
 * 拦截器执行器
 */
export default class FetchInterceptorExecuter {

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

    postHandle(data: FetchResponse, options: BaseFetchOptions): Promise<FetchResponse | null | undefined> {
        return this.executePostHandle(data, options);
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
            let interceptor = interceptorList[index];
            index++;

            result = await interceptor.preHandle(result);

            //异常
            if (result instanceof Error) {
                console.error("FetchInterceptorExecuter pre handle exception", result);
                return Promise.reject(result);
            }
        }
        return options;
    }

    /**
     * 执行拦截器后置处理
     * @param data
     * @param options
     */
    private async executePostHandle(data: FetchResponse, options: BaseFetchOptions): Promise<FetchResponse | null | undefined> {
        const interceptorList = this.interceptorList;
        let index = 0;

        const {success} = data;
        let result: FetchResponse = data;
        while (index < interceptorList.length) {
            let interceptor = interceptorList[index];
            index++;

            if (interceptor.executeMethod === ExecuteMethod.ONLY_PREV) {
                //跳过
                continue;
            }
            if (success) {
                //请求成功
                if (interceptor.executeMethod === ExecuteMethod.ONLY_ERROR) {
                    //跳过只在请求失败时才执行的filter
                    continue;
                }
            } else {
                //请求失败
                if (interceptor.executeMethod === ExecuteMethod.ONLY_SUCCESS) {
                    //跳过只在请求成功时才执行的filter
                    continue;
                }
            }
            result = await interceptor.postHandle(result, options);

            //异常
            if (result instanceof Error) {
                console.error("FetchInterceptorExecuter post handle exception", result);
                return Promise.reject(result);
            }
        }
        return result;
    }

}
