import {ProxyServiceFactory} from "./ProxyServiceFactory";
import {FetchClient} from "../fetch/FetchClient";
import {ProxyApiService} from "./ProxyApiService";
import {proxyRequest} from "./ProxyBuilderUtil";


/**
 * 代理服务工厂
 * es6版本
 */
class Es6PoxyServiceFactory implements ProxyServiceFactory {


    factory<T extends ProxyApiService> (targetService: T, fetchClient: FetchClient): T{

        const proxyHandler: ProxyHandler<any> = {
            get: (target: ProxyApiService, serviceMethod: PropertyKey, receiver: any): any => {
                return (...p) => {
                    return proxyRequest(fetchClient, target, serviceMethod as string, ...p);
                }
            },
            set: function (target, key, value, receiver): boolean {
                throw new Error("proxy service 不允许添加新的接口方法！");
            }
        };
        return new Proxy(targetService, proxyHandler);
    }

}

//导出唯一实例
export default new Es6PoxyServiceFactory();