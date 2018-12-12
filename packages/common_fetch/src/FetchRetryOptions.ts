import {FetchOptions} from "./FetchOptions";


export interface RetryOptions {
    /**
     * 重试次数
     * 默认：1
     */
    retries?: number;

    /**
     * 请求失败后，延迟多久进行重试，单位毫秒
     * 默认：100毫秒
     */
    delay?: number;

    /**
     * 最大的超时时间，单位毫秒
     * 默认：25 * 1000
     */
    maxTimeout?: number;

    /**
     * 当抛出异常时是否继续重试，默认不重试
     * @param response
     */
    when?: (response) => boolean;

    /**
     * 自定义的重试 处理
     * @param options  请求配置
     * @param response 上一次请求的结果
     */
    onRetry?<E>(options: FetchRetryOptions, response): Promise<E>;
}

/**
 * 请求重试配置
 */
export interface FetchRetryOptions extends FetchOptions, RetryOptions {


}