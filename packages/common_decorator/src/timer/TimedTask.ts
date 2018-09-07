import {closeTaskByFn, wrapperTask} from "./TimedTaskWrapper";

export interface TimedTaskOptions {

    /**
     * 定时任务的执行间隔毫秒数
     */
    times: number;

    // run: (...agrs) => any,

    /**
     * 开始执行的条件
     */
    before?: (...args) => Promise<boolean>;

    /**
     * 结束任务的条件
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
export function timedTask(options: TimedTaskOptions): any {

    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {

        target[name] = wrapperTask(target[name], options);

        return target;

    }
}

/**
 * 只执行一次的任务
 * @param times
 */
export function onceTask(times: number) {
    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {

        target[name] = wrapperTask(target[name], {
            times,
            count: 1
        });

        return target;

    }
}

export function clearTask(): any {
    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): any {
        let oldFn = target[name];
        target[name] = function (...args) {
            oldFn.apply(this, ...args);

            closeTaskByFn(this)
        };

        return target;

    }
}
