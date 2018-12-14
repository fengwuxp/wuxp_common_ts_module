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


    abstract factory<T extends ProxyApiService>(target: T): T;


    protected getProxyServiceExecutor = (): ProxyServiceExecutor => {

        //返回默认的代理执行器
        return FeignProxyExecutorHolder.DEFAULT_EXECUTOR;
    }


}