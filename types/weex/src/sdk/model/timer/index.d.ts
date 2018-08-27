import {WeexModule} from "../../../../index";

/**
 * 定时器
 */
export interface WeexTimerModule extends WeexModule {
    /**
     * @param {() => void} callback
     * @param {number} times  定时时间
     */
    readonly  setTimeout: (callback:Function, times: number) => number,

    /**
     * 关闭定时器
     * @param cb定时器
     */
    readonly clearTimeout: (cb: number) => void;
}
