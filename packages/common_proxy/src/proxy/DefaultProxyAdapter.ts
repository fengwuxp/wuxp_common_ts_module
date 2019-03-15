import {ProxyAdapter, ProxyCreateConfig} from "./ProxyAdapter";
import {es5Proxy} from "./Es5Proxy";
import {matchProxyScope} from "./ProxyScope";


/**
 * 默认的代理适配器
 * @param config
 */
export const defaultProxyAdapter: ProxyAdapter = <T extends object = any>(config: ProxyCreateConfig<T>) => {

    const {
        object,
        scope,
        methodInterceptor,
        setPropertyInterceptor,
        customMatch,
        noSuchMethodInterceptor
    } = config;

    const proxyHandler: ProxyHandler<T> = {
        get(target: T, propertyKey: PropertyKey, receiver: any): any {

            //是否匹配
            if (match(target, propertyKey, scope, customMatch)) {
                if (noSuchMethodInterceptor != null) {
                    return noSuchMethodInterceptor(target, propertyKey, receiver);
                }
                return methodInterceptor(target, propertyKey, receiver);
            } else {
                    throw new Error(`not support method proxy: ${propertyKey as string}`);
            }
        },
        set(target: T, propertyKey: PropertyKey, value: any, receiver: any): boolean {
            if (match(target, propertyKey, scope, customMatch)) {
                return setPropertyInterceptor(target, propertyKey, value, null);
            } else {
                throw new Error("not support set method proxy");
            }
        }
    };

    console.log("defaultProxyAdapter", "defaultProxyAdapter");

    if (typeof Proxy === "undefined") {
        return es5Proxy(object, proxyHandler);
    }

    return new Proxy(object, proxyHandler);

};

/**
 * 是否匹配代理执行的要求
 * @param target
 * @param propertyKey
 * @param scope
 * @param customMatch
 */
const match = (target: any, propertyKey: PropertyKey, scope, customMatch) => {
    const value = target[propertyKey];
    if (value == null) {
        //如果为空将尝试使用 noSuchMethodInterceptor
        return true;
    }
    if (customMatch != null) {
        if (typeof customMatch === "function") {
            return customMatch(target, propertyKey);
        } else if (customMatch.constructor === RegExp) {
            return (customMatch as RegExp).test(propertyKey as string);
        } else {
            return propertyKey === customMatch;
        }
    }
    return matchProxyScope(value, scope);
};