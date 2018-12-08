import BuilderProxyServiceUtil from "../utils/BuilderProxyServiceUtil";


export interface FeignOptions {

    /**
     * 所属的api模块
     * default 默认模块
     * 通过api模块名称可以区分不同模块的配置，比如api入口地址等
     */
    apiModule?: string;

    /**
     * api 请求根路径
     */
    // apiBasePath?: string;
}

/**
 * 标记为feign proxy
 * @constructor
 */
export function Feign<T extends { new(...args: any[]): any }>(feignOptions?: FeignOptions): any {

    /**
     * @param  {T} clazz
     */
    return (clazz: T): T => {
        const apiProxyService = BuilderProxyServiceUtil.build(new clazz());
        if (feignOptions) {
            apiProxyService.feign = feignOptions;
        }
        return apiProxyService;
    }
}
