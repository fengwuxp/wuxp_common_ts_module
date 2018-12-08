import {ProxyApiService} from "../ProxyApiService";
import {RestTemplate} from "../../template/RestTemplate";
import {RestTemplateLoader} from "../../template/RestTemplateLoader";
import {FeignOptions} from "../../annotations/Feign";
import {getApiModuleName} from "../../utils/FeignUtil";
import {ProxyServiceExecutor} from "../ProxyServiceExecutor";


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
     * 代理执行者
     */
    protected proxyServiceExecutor:ProxyServiceExecutor;


    constructor( proxyServiceExecutor: ProxyServiceExecutor) {
        this.proxyServiceExecutor = proxyServiceExecutor;
    }

    abstract factory<T extends ProxyApiService>(target: T): T;





}