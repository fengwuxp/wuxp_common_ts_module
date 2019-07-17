import {AbstractProxyServiceFactory} from "./ProxyServiceFactory";
import {ProxyApiService} from "../ProxyApiService";
import ProxyFactory from "fengwuxp_common_proxy/src/ProxyFactory";
import {ProxyScope} from "fengwuxp_common_proxy/src/proxy/ProxyScope";


/**
 * 默认的代理服务工厂
 */
export default class DefaultProxyServiceFactory extends AbstractProxyServiceFactory {


    factory<T extends ProxyApiService>(targetService: T): T {
        return ProxyFactory.newProxyInstance(
            targetService, (target: ProxyApiService, serviceMethod: string, receiver: any) => {
                return (...args) => {
                    //TODO  根据不同的策略可以返回不同的代理服务执行器
                    return this.getProxyServiceExecutor().execute(targetService, serviceMethod, ...args);
                };
            }, null,
            ProxyScope.METHOD,
            (object, key) => {
                return !this.isIgnore(targetService, key);
            }
        );
    }


}