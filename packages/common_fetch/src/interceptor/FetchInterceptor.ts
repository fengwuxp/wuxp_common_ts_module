import {FetchResponse} from "../FetchOptions";

/**
 * 拦截器
 */
export interface FetchInterceptor<T = any> {


    /**
     * 请求之前的处理
     * @param  {T} params 请求参数
     * @return {T | Promise<T>} 返回非空值表示：是否继续处理下一个Interceptor 返回Promise如果状态为fulfilled则不继续往下处理
     */
    preHandle(params: T): T | Promise<T> | undefined | null;


    /**
     * 请求之后的处理，仅在请求成功时执行
     * @param {FetchResponse} response 请求结果数据
     * @param {T} options 请求参数
     * @return {FetchResponse | Promise<FetchResponse>} 是否继续处理下一个Interceptor或已经处理完成
     */
    postHandle?(response: FetchResponse, options: T): FetchResponse | Promise<FetchResponse> | undefined | null;

    /**
     * 请求之后的处理，仅在请求失败执行
     * @param response
     * @param options
     */
    postHandleError?<R>(response: R, options: T): R | undefined | null;

    /**
     * 请求完成后执行，不论成功或失败，一旦实现了该方法则将不会执行postHandle或postHandleError
     * @param response
     * @param options
     */
    postHandleCompleted?<R>(response: R, options: T): R | undefined | null;

}