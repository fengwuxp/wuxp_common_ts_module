import {LockExecutePlugin, ProxyFunctionType} from "./LockExecutePlugin";


/**
 * 模拟同步执行的插件
 */
export default class MockSyncExecutePlugin implements LockExecutePlugin {


    /**
     * 连续执行的最小间隔时间，毫秒数
     * 默认：1000
     */
    private minimumIntervalMilliseconds: number;


    constructor(minimumIntervalMilliseconds?: number) {
        this.minimumIntervalMilliseconds = minimumIntervalMilliseconds || 1 * 1000;
    }

    newProxyFunction = (fn: (...args) => any): ProxyFunctionType => {

        const minimumIntervalMilliseconds = this.minimumIntervalMilliseconds;

        return async function (...args): Promise<any> {

            let isLock = false, beginTime = new Date().getTime();
            if (isLock) {
                //被锁定
                return Promise.resolve(null);
            }
            isLock = true;

            const proxy: Promise<any> = (await fn(...args)) as any;
            const endTime = new Date().getTime();

            return proxy["finally"]((data) => {
                //方法执行的时间
                const times = endTime - beginTime;
                if (times >= minimumIntervalMilliseconds - 16) {
                    isLock = false;
                } else {
                    setTimeout(() => {
                        isLock = false;
                    }, this.minimumInterval - times);
                }

                return data;
            });

        };

    };


}