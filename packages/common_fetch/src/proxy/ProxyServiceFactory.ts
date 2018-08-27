import {FetchClient} from "../fetch/FetchClient";
import {ProxyApiService} from "./ProxyApiService";


/**
 * 代理服务工厂
 */
export interface ProxyServiceFactory {

    factory<T extends ProxyApiService>(target: T, fetchClient: FetchClient): T;
}