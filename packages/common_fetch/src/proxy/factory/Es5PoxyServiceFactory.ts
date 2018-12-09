import {AbstractProxyServiceFactory} from "./ProxyServiceFactory";
import {ProxyApiService} from "../ProxyApiService";
import {ProxyServiceExecutor} from "../executor/ProxyServiceExecutor";


/**
 * 代理服务工厂
 * es5版本
 */
export default class Es5PoxyServiceFactory extends AbstractProxyServiceFactory {


    constructor(proxyServiceExecutor: ProxyServiceExecutor) {
        super(proxyServiceExecutor);
    }

    factory<T extends ProxyApiService>(targetService: T): T {

        const proxy: T = {} as T;

//         value:属性的值
//         writable:如果为false，属性的值就不能被重写,只能为只读了
//         configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
//         enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。

        for (const key in targetService) {
            if (typeof targetService[key] !== "function") {
                //不是函数 return
                continue;
            }
            Object.defineProperty(proxy, key, {
                set: function (val) {
                    throw new Error("proxy service 不允许添加新的接口方法");
                },
                get: () => {
                    return (...p) => {
                        return this.proxyServiceExecutor.execute(targetService,key,...p);
                    }
                }
            });
        }

        return proxy;
    }
}


