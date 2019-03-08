import {ProxyApiService} from "../ProxyApiService";
import {ProxyServiceExecutor} from "../executor/ProxyServiceExecutor";
import FeignProxyExecutorHolder from "../feign/FeignProxyExecutorHolder";


/**
 * 代理服务工厂
 */
export interface ProxyServiceFactory {

    factory<T extends ProxyApiService>(target: T): T;
}


/**
 * 抽象的服务工厂
 */
export abstract class AbstractProxyServiceFactory implements ProxyServiceFactory {


    /**
     * 默认忽略执行的方法和属性
     */
    private ignorePropertyNames: string[] = [
        "getServiceMethodConfig",
        "setServiceMethodConfig",
        "feign"
    ];


    abstract factory<T extends ProxyApiService>(target: T): T;


    protected getProxyServiceExecutor = (): ProxyServiceExecutor => {

        //返回默认的代理执行器
        return FeignProxyExecutorHolder.getExecutor();
    };

    protected isIgnore = (targetService, key: string) => {
        const element = targetService[key];
        if (element == null) {
            return false;
        }
        if (typeof element != "function") {
            return true;
        }
        return this.ignorePropertyNames.findIndex((item) => item === key) >= 0;
    }


}