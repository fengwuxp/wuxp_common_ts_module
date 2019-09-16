import {FetchInterceptor} from "../interceptor/FetchInterceptor";

/**
 * feign configuration
 */
export interface FeignConfiguration {

    /**
     * 获取拦截器列表
     */
    interceptors: () => FetchInterceptor[];
}
