import {AbstractProxyServiceFactory} from "./ProxyServiceFactory";
import {ProxyApiService} from "../ProxyApiService";
import ProxyFactory from "common_proxy/src/ProxyFactory";
import {ProxyScope} from "common_proxy/src/proxy/ProxyScope";


/**
 * 默认的代理服务工厂
 */
export default class DefaultProxyServiceFactory extends AbstractProxyServiceFactory {


    factory<T extends ProxyApiService>(targetService: T): T {
        return ProxyFactory.newProxyInstance(
            targetService, (target: ProxyApiService, serviceMethod: string, receiver: any) => {
                return function (...args) {
                    return this.getProxyServiceExecutor().execute(targetService, serviceMethod, ...args);
                };
            }, null,
            ProxyScope.METHOD,
            (key) => {
                return this.isIgnore(targetService, key);
            }
        );
    }


}