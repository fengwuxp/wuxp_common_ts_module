// import {ProxyApiService, ProxyServiceMethod} from "./ProxyApiService";
// import {FetchClient} from "../fetch/FetchClient";
// import ResolverRegister, {argumentResolverName, requestURLResolverName} from "../register/ResolverRegister";
// import AbstractArgumentsResolver from "../resolve/arguments/AbstractArgumentsResolver";
// import {ArgumentsResolver} from "../resolve/arguments/ArgumentsResolver";
// import RequestURLResolver from "../resolve/url/RequestURLResolver";
// import {RestTemplate} from "../template/RestTemplate";
// import SimpleRequestURLResolver from "../resolve/url/SimpleRequestURLResolver";
//
//
// //获取参数解析者
// let argumentsResolver: ArgumentsResolver;
//
// //请求url 解析
// const requestURLResolver: RequestURLResolver=new SimpleRequestURLResolver();
// /**
//  * 发起请求
//  * @param restTemplate 发出请求的客户端工具
//  * @param apiService
//  * @param methodName
//  * @param p          额外参数
//  */
// export const proxyRequest = (restTemplate: RestTemplate, apiService: ProxyApiService, methodName: string, ...p) => {
//
//     if (argumentsResolver == null) {
//         argumentsResolver = ResolverRegister.get(argumentResolverName);
//     }
//
//
//     //获取服务方法的默认返回值，一般是请求借口需要的签名参数
//     const serviceMethod:ProxyServiceMethod = apiService[methodName];
//     const result: any = typeof serviceMethod === "function" ? serviceMethod() : null;
//
//     let uri;
//     if (AbstractArgumentsResolver.enabledDecorator) {
//         //启用了装饰器
//         uri = result.url == null ? methodName : result.url;
//     } else {
//         uri = methodName;
//     }
//     //通过url解析策略获取到请求的url
//     // 可以在客户端需要请求多个模块的服务的是可以做到无缝切换
//     const url = requestURLResolver.resolve(apiService, uri);
//
//     return restTemplate.fetch(argumentsResolver.resolve(url, result, ...p));
// };
//
//
//
//
