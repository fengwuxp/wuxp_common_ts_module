/**
 * fetch feign proxy的初始化器
 */
export interface FetchFeignProxyInitializer {

    /**
     * 初始化
     */
    init: () => void | Promise<void>;
}

