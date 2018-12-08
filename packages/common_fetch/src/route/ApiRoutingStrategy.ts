/**
 * api路由策略
 */
export interface ApiRoutingStrategy {

    /**
     * 路由
     * @param url  刑如：@testApiModule/test/query
     * @return 真实的url
     */
    route: (url: string) => string;
}

export interface ApiRoutingMapping {

    /**
     * key api模块名称
     * value api实际的接口入口地址
     * 如果只有一个模块的话 key =default
     */
    [key: string]: string;
}