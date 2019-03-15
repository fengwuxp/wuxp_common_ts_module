// import {AbstractProxyServiceFactory} from "./ProxyServiceFactory";
// import {ProxyApiService} from "../ProxyApiService";
//
//
// /**
//  * 代理服务工厂
//  * es6版本
//  */
// export default class Es6ProxyServiceFactory extends AbstractProxyServiceFactory {
//
//
//     factory<T extends ProxyApiService>(targetService: T): T {
//
//         const proxyHandler: ProxyHandler<any> = {
//             get: (target: ProxyApiService, serviceMethod: string, receiver: any): any => {
//                 return (...p) => {
//                     if (this.isIgnore(targetService, serviceMethod)) {
//                         return Promise.reject('is ignore');
//                     }
//                     return this.getProxyServiceExecutor().execute(targetService, serviceMethod, ...p);
//                 }
//             },
//             set: function (target, key, value, receiver): boolean {
//                 throw new Error("proxy service 不允许添加新的接口方法！");
//             }
//         };
//         return new Proxy(targetService, proxyHandler);
//     }
//
// }
//
