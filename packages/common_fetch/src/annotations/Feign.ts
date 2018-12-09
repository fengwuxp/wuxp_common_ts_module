import {FeignProxy} from "../proxy/ProxyApiService";
import {ProxyServiceFactory} from "../proxy/factory/ProxyServiceFactory";


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


let proxyFactory: ProxyServiceFactory;

export function setProxyFactory(factory: ProxyServiceFactory) {
    proxyFactory = factory;
}


/**
 * 标记为feign proxy
 * @constructor T extends { new(...args: any[]): any }
 */
export function Feign<T extends FeignProxy>(feignOptions?: FeignOptions): any {

    /**
     * 创建feign代理的实例
     * @param  {T} clazz
     */
    return (clazz: any): T => {
        if (proxyFactory == null) {
            new Error("proxyFactory is not init，please use setProxyFactory");
        }
        return proxyFactory.factory(new clazz(feignOptions));
    }
}
