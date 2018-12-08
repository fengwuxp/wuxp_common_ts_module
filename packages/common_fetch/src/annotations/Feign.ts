import BuilderProxyServiceUtil from "../utils/BuilderProxyServiceUtil";
import {FeignProxy} from "../proxy/ProxyApiService";


export interface FeignOptions {

    /**
     * 所属的api模块
     * default 默认模块
     * 通过api模块名称可以区分不同模块的配置，比如api入口地址等
     */
    apiModule?: string;

    /**
     * 请求uri
     */
    value?: string;

}

type FeignGenerate<T extends FeignProxy> = (clazz: T) => FeignProxy

/**
 * 标记为feign proxy
 * @constructor T extends { new(...args: any[]): any }
 */
export function Feign<T extends FeignProxy>(feignOptions?: FeignOptions): any {

    /**
     * @param  {T} clazz
     */
    return (clazz: any): T => {
        const apiProxyService: T = BuilderProxyServiceUtil.build<any>(new clazz());
        if (feignOptions) {
            apiProxyService.feign = feignOptions;
        }
        return apiProxyService;
    }
}
