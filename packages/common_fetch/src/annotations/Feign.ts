import {ProxyServiceFactory} from "../proxy/factory/ProxyServiceFactory";
import {FeignProxy, FeignProxyApiServiceMethodConfig} from "../proxy/feign/FeignProxy";
import {defaultApiModuleName} from "../constant/FeignConstVar";
import DefaultProxyServiceFactory from "../proxy/factory/DefaultProxyServiceFactory";
import {FeignConfiguration} from "../configuration/FeignConfiguration";


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

    /**
     * 配置
     */
    configuration?: FeignConfiguration[];

}


// type FeignGenerate<T extends FeignProxy> = (clazz: T) => FeignProxy


//默认使用es5的代理工厂
const proxyFactory: ProxyServiceFactory = new DefaultProxyServiceFactory();


/**
 * 标记为feign proxy
 * @constructor T extends { new(...args: any[]): any }
 */
export function Feign<T extends FeignProxy>(options?: FeignOptions): any {


    const feignOptions: FeignOptions = {
        apiModule: defaultApiModuleName,
        ...(options || {})
    };

    /**
     * 创建feign代理的实例
     * @param  {T} clazz
     */
    return (clazz: { new(...args: any[]): {} }): any => {
        if (proxyFactory == null) {
            throw  new Error("proxyFactory is not init，please use setProxyFactory");
        }

        /**
         * 返回一个实现了FeignProxy接口的匿名类
         */
        return class extends clazz implements FeignProxy {


            constructor() {
                super();
                //通过代理工厂创建实例
                return proxyFactory.factory(this);
            }

            serviceName: string = feignOptions.value || clazz.name;


            /**
             * feign代理的相关配置
             */
            feignOptions: FeignOptions = feignOptions;

            /**
             * 接口方法配置列表
             * key 接口方法名称
             * value 接口方法配置
             */
            protected configs: Map<string, FeignProxyApiServiceMethodConfig> = new Map<string, FeignProxyApiServiceMethodConfig>();


            /**
             * 获取获取接口方法的配置
             * @param serviceMethod  服务方法名称
             */
            public getServiceMethodConfig = (serviceMethod: string): FeignProxyApiServiceMethodConfig => {

                return this.configs.get(serviceMethod) || {};
            };

            /**
             * 设置服务方法的配置config
             * @param serviceMethodName
             * @param config
             */
            public setServiceMethodConfig = (serviceMethodName: string, config: FeignProxyApiServiceMethodConfig) => {
                this.configs.set(serviceMethodName, config);
            };


        }
    }
}
