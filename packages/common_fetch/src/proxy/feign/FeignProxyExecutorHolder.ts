import {ProxyServiceExecutor} from "../executor/ProxyServiceExecutor";

/**
 * 代理执行器的持有者
 * 该持有者是为了将代理执行器的获取推到运行时，
 * 解决在导入Feign代理服务的时顺序的问题
 *
 */
export default class FeignProxyExecutorHolder {

    /**
     * 默认的执行器
     */
    public static DEFAULT_EXECUTOR: ProxyServiceExecutor;

    private constructor() {
    }
}