import {ProxyServiceExecutor} from "../executor/ProxyServiceExecutor";
import {defaultApiModuleName} from "../../constant/FeignConstVar";


/**
 * 代理执行器的持有者
 * 该持有者是为了将代理执行器的获取推到运行时，
 * 解决在导入Feign代理服务的时顺序的问题
 *
 */
export interface FeignProxyExecutorHolder {

    registerExecutor: (name: string, exctuer: ProxyServiceExecutor) => void;

    registerDefaultExecutor: (exctuer: ProxyServiceExecutor) => void;

    /**
     * 获取一个执行器，如果
     * @param name 默认：default
     */
    getExecutor: (name?: string) => ProxyServiceExecutor;
}


class DefaultFeignProxyExecutorHolder implements FeignProxyExecutorHolder {

    /**
     * 默认的执行器
     */
    private static HOLDER_MAP: Map<string, ProxyServiceExecutor> = new Map<string, ProxyServiceExecutor>();

    constructor() {
    }

    getExecutor = (name: string = defaultApiModuleName) => DefaultFeignProxyExecutorHolder.HOLDER_MAP.get(name);

    registerDefaultExecutor = (exctuer: ProxyServiceExecutor) => {
        return this.registerExecutor(defaultApiModuleName, exctuer);
    };

    registerExecutor = (name: string, exctuer: ProxyServiceExecutor) => {
        DefaultFeignProxyExecutorHolder.HOLDER_MAP.set(name, exctuer);
    }


}

export default new DefaultFeignProxyExecutorHolder();