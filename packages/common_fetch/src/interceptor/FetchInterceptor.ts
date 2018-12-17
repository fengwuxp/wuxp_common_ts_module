import {FetchResponse} from "../FetchOptions";

/**
 * 拦截器
 */
export interface FetchInterceptor<T = any> {


    /**
     * 请求之前的处理
     * @param  {T} params 请求参数
     * @return {T | Promise<T>} 返回非空值表示：是否继续处理下一个Interceptor 返回Promise如果状态为fulfilled则继续往下处理
     */
    preHandle(params: T): T | Promise<T> | undefined | null;

    /**
     * 前置处理执行条件
     * @param params
     */
    preExecutionCondition: (params: T) => boolean;

    /**
     * 请求之后的处理
     * @param {FetchResponse} data 请求结果数据
     * @param {T} options 请求参数
     * @return {FetchResponse | Promise<FetchResponse>} 是否继续处理下一个Interceptor或已经处理完成
     */
    postHandle(data: FetchResponse, options: T): FetchResponse | Promise<FetchResponse> | undefined | null;

    /**
     * 后置处理的的执行条件
     * @param params
     */
    postExecutionCondition: (data: FetchResponse, options: T) => boolean;

}