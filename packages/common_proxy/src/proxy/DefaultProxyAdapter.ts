import {ProxyAdapter, ProxyCreateConfig} from "./ProxyAdapter";
import {es5Proxy} from "./Es5Proxy";
import {matchProxyScope, ProxyScope} from "./ProxyScope";


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
        get: (target: T, propertyKey: PropertyKey, receiver: any): any => {


            let element = target[propertyKey];
            const isMethod = typeof element === "function";

            //是否匹配
            if (match(target, propertyKey, isMethod, scope, customMatch)) {
                if (noSuchMethodInterceptor != null) {
                    element = noSuchMethodInterceptor(target, propertyKey, receiver);
                }
                element = methodInterceptor(target, propertyKey, receiver);
            }
            if (isMethod) {
                //保证this 对象的传递
                return element.bind(target);
            }
            return element;
        },
        set: (target: T, propertyKey: PropertyKey, value: any, receiver: any): boolean => {
            if (match(target, propertyKey, false, scope, customMatch)) {
                return setPropertyInterceptor(target, propertyKey, value, null);
            } else {
                //保持原有的行为
                target[propertyKey] = value;
                return true;
            }
        }
    };

    if (typeof Proxy === "undefined") {
        return es5Proxy(object, proxyHandler);
    }

    return new Proxy(object, proxyHandler);

};

/**
 * 是否匹配代理执行的要求
 * @param target
 * @param propertyKey
 * @param isMethod
 * @param scope
 * @param customMatch
 */
const match = (target: any,
               propertyKey: PropertyKey,
               isMethod: boolean,
               scope: ProxyScope,
               customMatch) => {
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
    return matchProxyScope(value, isMethod, scope);
};