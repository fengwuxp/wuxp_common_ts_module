/**
 * 重试上下文
 */
export interface RetryContext {


    /**
     * 已经重试的次数
     */
    getRetryCount: () => number;
}