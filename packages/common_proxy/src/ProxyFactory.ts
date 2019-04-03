import {defaultProxyAdapter} from "./proxy/DefaultProxyAdapter";
import {MethodInterceptor, SetPropertyInterceptor} from "./ProxyInterceptor";
import {ProxyScope} from "./proxy/ProxyScope";
import {CustomMatchType} from "./proxy/ProxyAdapter";


/**
 * 代理工厂
 */
export default class ProxyFactory {


    /**
     * 实例化一个代理对象
     * @param target
     * @param methodInterceptor
     * @param setPropertyInterceptor
     * @param scope
     * @param customMatch
     */
    static newProxyInstance = <T>(target: T,
                                  methodInterceptor: MethodInterceptor,
                                  setPropertyInterceptor?: SetPropertyInterceptor,
                                  scope?: ProxyScope,
                                  customMatch?: CustomMatchType): T => {
        return defaultProxyAdapter({
            object: target,
            methodInterceptor,
            setPropertyInterceptor,
            scope: scope,
            customMatch
        });
    };

    /**
     *  实例化一个代理对象并对其进行增强
     * @param target
     * @param methodInterceptor
     * @param noSuchMethodInterceptor
     */
    static newProxyInstanceEnhance = <T>(target: T,
                                         methodInterceptor: MethodInterceptor,
                                         noSuchMethodInterceptor:MethodInterceptor): T => {

        return defaultProxyAdapter({
            object: target,
            methodInterceptor,
            noSuchMethodInterceptor
        });
    };

    static newInstance = defaultProxyAdapter;

}

