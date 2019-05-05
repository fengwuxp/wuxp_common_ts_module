
import {RetryContext} from "./RetryContext";

/**
 * 重试策略
 */
export interface RetryPolicy {


    /**
     * 是否允许重试
     * @param retryContext
     */
    canRetry:(retryContext:RetryContext)=>boolean;
}