import {MethodInterceptor, SetPropertyInterceptor} from "../ProxyInterceptor";
import {ProxyScope} from "./ProxyScope";


export interface ProxyCreateConfig<T = any> {

    /**
     * 代理的目标
     */
    object: T;

    /**
     * 方法拦截
     */
    methodInterceptor: MethodInterceptor;

    /**
     * 没有找到方法或者属性时的增强处理
     */
    noSuchMethodInterceptor?: MethodInterceptor;

    /**
     * 设置属性拦截,在需要代理set method方法传入
     */
    setPropertyInterceptor?: SetPropertyInterceptor;


    /**
     * 默认 ProxyScope.METHOD
     */
    scope?: ProxyScope;


    /**
     * 自定义的匹配
     * @param prop
     */
    customMatch?: CustomMatchType<T>;
}

export type CustomMatchType<T = any> = (object: T, propertyKey: string) => boolean | RegExp;

export type ProxyAdapter<T = any> = (config: ProxyCreateConfig<T>) => T;