import {TimedTaskOptions} from "./TimedTask";


const timedTaskManager: Map<Function, number> = new Map<Function, number>();


/**
 * 将一个函数包装为定时任务
 * @author wxup
 * @create 2018-09-06 14:06
 **/
export function wrapperTask(task: Function, options: TimedTaskOptions) {
    const {times, close, count, before} = options;

    if (timedTaskManager.get(task) != null) {
        //抛出异常
        throw new Error("该任务已经存在");
    }

    if (count == null || count === -1) {
        //无限循环
        return function (...args) {

            if (typeof before === "function") {
                before()['finally']((resp: boolean) => {
                    if (resp == false) {
                        return;
                    }
                    interval(task, times, close, ...args);
                });
            } else {
                interval(task, times, close, ...args);
            }
        }

    } else {
        return function (...args) {
            loopTask(task, times, count, close, ...args);
        }

    }

}

/**
 * 关闭定时任务
 * @param task
 */
export function closeTask(task: Function) {

    while (true) {
        //保证一定被关闭
        const number = timedTaskManager.get(task);
        if (number == null) {
            break;
        }
        clearInterval(number);
        clearTimeout(number);
        timedTaskManager.delete(task);
    }
}

/**
 * 无限循环任务
 * @param task
 * @param times
 * @param close
 * @param args
 */
function interval(task, times, close, ...args) {

    let timerId = setInterval(() => {
        if (typeof close === "function") {
            const isClose = close();
            if (isClose) {
                //提前结束任务
                closeTask(task);
                return;
            }
        }
        task(...args);
    }, times);
    timedTaskManager.set(task, timerId);
}

/**
 * 循环执行任务
 * @param task
 * @param times
 * @param count
 * @param close
 * @param args
 */
function loopTask(task, times, count, close, ...args) {
    if (count === 0) {
        timedTaskManager.delete(task);
        return;
    }
    if (typeof close === "function") {
        const isClose = close();
        if (isClose) {
            //提前结束任务
            closeTask(task);
            return;
        }
    }
    let timerId = setTimeout(() => {
        task(...args);
        count--;
        loopTask(task, times, count, close);
    }, times);

    timedTaskManager.set(task, timerId);
}

