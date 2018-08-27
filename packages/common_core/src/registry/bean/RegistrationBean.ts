import {Registry} from "../Registry";


/**
 * bean 注册中心
 */
export interface RegistrationBean<T> extends Registry<T>{

    /**
     * 注册一个bean
     * @param key
     * @param bean
     */
    register: (key: string | number, bean: T) => void;


    /**
     * 获取一个注册的bean的实例
     * @param key  字符串 数字 或者对应的服务类型
     */
    get: (key: string | number | any) => T;

    /**
     * 遍历当前注册中心的bean
     * @param callback
     */
    forEach: (callback: (t: T, key: string | number) => void) => void;
}