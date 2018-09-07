import {TimedTaskOptions} from "./TimedTask";


const timedTaskManager: Map<Function, Map<Function, number>> = new Map<Function, Map<Function, number>>();


export function wrapperTask(task: Function, options: TimedTaskOptions) {


    if (timedTaskManager.get(task) != null) {
        //抛出异常
        throw new Error("该任务已经存在");
    }


    let {times, close, count, before} = options;

    if (count == null || count === -1) {
        //无限循环
        return intervalTask as any

    } else {
        return loopTask as any;
    }


    function intervalTask(...args) {
        //先关闭前一次任务
        closeTaskByFn(task);
        if (typeof before === "function") {

            before.apply(this, ...args)['finally']((resp: boolean) => {
                if (resp == false) {
                    return;
                }
                interval.apply(this, ...args);
            });
        } else {
            interval.apply(this, ...args);
        }
    }

    function loopTask(...args) {
        //先关闭前一次任务
        closeTaskByFn(task);
        if (typeof before === "function") {

            before.apply(this, ...args)['finally']((resp: boolean) => {
                if (resp == false) {
                    return;
                }
                timeOut.apply(this, ...args);
            });
        } else {
            timeOut.apply(this, ...args);
        }

    }


    /**
     * 无限循环任务
     * @param args
     */
    function interval(...args) {

        let timerId = setInterval(() => {
            if (typeof close === "function") {
                const isClose = close.apply(this, ...args);
                console.log("isClose", isClose)
                if (isClose) {
                    //提前结束任务
                    closeTaskByFn(task);
                    return;
                }
            }
            // this[task.name](...args);
            task.apply(this, ...args);
        }, times);
        pushTask(this, task, timerId);
    }


    /**
     * 循环执行任务
     * @param args
     */
    function timeOut(...args) {
        if (count === 0) {
            timedTaskManager.delete(task);
            return;
        }
        if (typeof close === "function") {
            const isClose = close.apply(this, ...args);
            if (isClose) {
                //提前结束任务
                closeTaskByFn(task);
                return;
            }
        }
        let timerId = setTimeout(() => {
            task.apply(this, ...args);
            count--;
            timeOut.apply(this, ...args);
        }, times);

        pushTask(this, task, timerId);
    }
}


/**
 * 关闭定时任务
 * @param clazz 任务持有者
 * @param task  任务
 */
export function closeTaskByFn(clazz, task?: Function) {

    //保证一定被关闭
    while (true) {
        const map = timedTaskManager.get(clazz);
        if (map == null) {
            break;
        }
        if (task == null) {
            //清除所有定时任务
            const values = map.values();
            console.log(`清除${clazz.constructor.name}所有定时任务`);
            while (true) {
                const next = values.next();
                if (next.done) {
                    break;
                }
                clearInterval(next.value);
                clearTimeout(next.value);
                map.delete(task);
            }
            timedTaskManager.delete(clazz);
            return;
        }

        const number = map.get(task);
        if (number == null) {
            break;
        }
        clearInterval(number);
        clearTimeout(number);
        map.delete(task);
    }
}

function pushTask(clazz, fn, timerId) {
    let map = timedTaskManager.get(clazz);
    if (map == null) {
        map = new Map<Function, number>();
        timedTaskManager.set(clazz, map);
    }
    map.set(fn, timerId);
}



