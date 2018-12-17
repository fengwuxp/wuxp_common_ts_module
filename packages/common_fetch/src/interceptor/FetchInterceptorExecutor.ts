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
            if (!interceptor.preExecutionCondition(result)) {
                continue;
            }
            try {
                result = await interceptor.preHandle(result);
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
     */
    private async executePostHandle(data: FetchResponse, options: BaseFetchOptions): Promise<FetchResponse | null | undefined> {
        const interceptorList = this.interceptorList;
        let index = 0;

        let result: FetchResponse = data;
        while (index < interceptorList.length) {
            let interceptor = interceptorList[index];
            index++;
            if (!interceptor.postExecutionCondition(result, options)) {
                continue;
            }
            try {
                result = await interceptor.postHandle(result, options);
            } catch (e) {
                //异常，跳过
                console.error("FetchInterceptorExecutor post handle exception", e);
            }

        }
        return result;
    }

}
