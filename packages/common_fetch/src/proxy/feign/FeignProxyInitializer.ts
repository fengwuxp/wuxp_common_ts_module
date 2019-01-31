/**
 * fetch proxy的初始化器
 */
export interface FeignProxyInitializer {

    /**
     * 初始化feign的代理工厂
     */
    initFeignProxyFactory: (...args) => void;



}