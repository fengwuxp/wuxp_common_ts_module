import {ProxyServiceFactory} from "../proxy/factory/ProxyServiceFactory";
import {FeignProxy} from "../proxy/feign/FeignProxy";


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


let proxyFactory: ProxyServiceFactory = {
    factory() {
        // throw  new Error("this is empty factory");
        // console.error("this is empty factory")
        return null;
    }
};

export function setProxyFactory(factory: ProxyServiceFactory) {
    console.log("set proxy factory");
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
    return (clazz: any): any => {
        console.log("feign proxy init");
        if (proxyFactory == null) {
            new Error("proxyFactory is not init，please use setProxyFactory");
        }

        return class extends clazz {

            constructor() {
                super(feignOptions);
                return proxyFactory.factory(this);
            }
        }
    }
}
