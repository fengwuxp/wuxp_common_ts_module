export interface TimedTaskOptions {

    /**
     * 定时任务的执行间隔毫秒数
     */
    times: number;

    /**
     * 开始执行的条件
     * @param args
     */
    startCondition?: (...args) => boolean;

    /**
     * 结束任务的条件
     * @param args
     */
    close?: (...args) => boolean;

    /**
     * 执行次数，-1表示无限次数
     */
    count?: number;
}

/**
 * 将方法标记为定时任务
 * @author wxup
 * @create 2018-09-06 13:19
 * @param options
 **/
export function timedTask(options: TimedTaskOptions) {

}
