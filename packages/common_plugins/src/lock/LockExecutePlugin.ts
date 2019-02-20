import {UIPlugin} from "../UIPlugin";


export type ProxyFunctionType = (...args) => Promise<any>;

/**
 * 锁定执行插件, 防止按钮被连续点击调用
 */
export interface LockExecutePlugin extends UIPlugin {


    /**
     * 创建一个代理执行的函数，支持模拟同步调用
     * @param fn
     */
    newProxyFunction: <T=any>(fn: (...args) => T) => ProxyFunctionType;


}