import {AbstractProxyServiceFactory} from "./ProxyServiceFactory";
import {ProxyApiService} from "../ProxyApiService";


/**
 * 代理服务工厂
 * es6版本
 */
export default class Es6PoxyServiceFactory extends AbstractProxyServiceFactory {



    factory<T extends ProxyApiService>(targetService: T): T {

        const proxyHandler: ProxyHandler<any> = {
            get: (target: ProxyApiService, serviceMethod: PropertyKey, receiver: any): any => {
                return (...p) => {
                    return this.getProxyServiceExecutor().execute(targetService, serviceMethod as string, ...p);
                }
            },
            set: function (target, key, value, receiver): boolean {
                throw new Error("proxy service 不允许添加新的接口方法！");
            }
        };
        return new Proxy(targetService, proxyHandler);
    }

}

