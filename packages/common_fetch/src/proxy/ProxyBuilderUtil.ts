import {FetchOptions} from "../fetch/FetchOptions";
import {ProxyApiService} from "./ProxyApiService";
import {FetchClient} from "../fetch/FetchClient";
import ResolverRegister, {argumentResolverName, requestURLResolverName} from "../register/ResolverRegister";
import AbstractArgumentsResolver from "../resolve/arguments/AbstractArgumentsResolver";
import {ArgumentsResolver} from "../resolve/arguments/ArgumentsResolver";
import {isFunction, isNullOrUndefined} from "util";
import RequestURLResolver from "../resolve/url/RequestURLResolver";


//获取参数解析者
let argumentsResolver: ArgumentsResolver;

//请求url 解析
let requestURLResolver: RequestURLResolver;
/**
 * 发起请求
 * @param fetchClient 发出请求的客户端工具
 * @param apiService
 * @param serviceMethod
 * @param p          额外参数
 */
export const proxyRequest = (fetchClient: FetchClient, apiService: ProxyApiService, serviceMethod: string, ...p) => {

    if (argumentsResolver == null) {
        argumentsResolver = ResolverRegister.get(argumentResolverName);
        requestURLResolver = ResolverRegister.get(requestURLResolverName);
    }


    //获取服务方法的默认返回值，一般是请求借口需要的签名参数
    const serviceElement = apiService[serviceMethod];
    const result: any = isFunction(serviceElement) ? serviceElement() : null;

    let uri;
    if (AbstractArgumentsResolver.enabledDecorator) {
        //启用了装饰器
        uri = isNullOrUndefined(result.url) ? serviceMethod : result.url;
    } else {
        uri = serviceMethod;
    }
    //通过url解析策略获取到请求的url
    // 可以在客户端需要请求多个模块的服务的是可以做到无缝切换
    const url = requestURLResolver.resolve(apiService, uri);

    return fetchClient.fetch(argumentsResolver.resolve(url, result, ...p));
};




