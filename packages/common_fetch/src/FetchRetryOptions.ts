/**
 * 请求重试配置
 */
export interface FetchRetryOptions {

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
}