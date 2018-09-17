import {isPromise} from "common_utils/src/fn/isPromise";


/**
 * 将方法标记为同步等待，在方法为完成之后times毫秒才能够被再次调用
 * @param times 毫秒数
 */
export function syncWait(times: number = 0): any {

    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): any {

        let loading = false;
        let oldFn = target[name];
        target[name] = function (...args) {
            if (loading) {
                // console.log("方法已被锁定");
                return;
            }
            // console.log("执行方法", oldFn.name);
            //锁定
            loading = true;
            const resp = oldFn.apply(this, ...args);
            if (isPromise(resp)) {
                //promise
                resp.finally(() => {
                    setTimeout(() => {
                        loading = false;
                        // console.log("方法已解锁")
                    }, times);
                });
            } else {
                setTimeout(() => {
                    loading = false;
                    // console.log("方法已解锁")
                }, times);
            }

            return resp;
        };

        return target;

    }
}

/**
 * 定时锁定某个方法，在times毫秒后才能被再次调用
 * @param times 毫秒数
 */
export function timeLock(times: number) {
    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {

        let loading = false;
        let oldFn = target[name];
        target[name] = function (...args) {
            if (loading) {
                return;
            }
            //锁定
            loading = true;
            const resp = oldFn.apply(this, ...args);

            if (isPromise(resp)) {
                //promise
                resp.finally(() => {
                    setTimeout(() => {
                        loading = false;
                        console.log("方法已解锁")
                    }, times);
                });
            } else {
                setTimeout(() => {
                    loading = false;
                    console.log("方法已解锁")
                }, times);
            }
            return resp;
        };

        return target;
    }
}

/**
 * 当方法调用的结果满足条件condition时，这个方法无法被再次调用
 * @param condition 如果 condition===true 则表示无论方法返回什么结果，改方法都只会执行一次
 */
export function once(condition: any = true) {

    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {

        let lock = false;
        let oldFn = target[name];
        target[name] = function (...args) {
            if (lock) {
                //返回值
                return;
            }

            const resp = oldFn.apply(this, ...args);
            if (condition === true) {
                lock = true;
                return resp;
            }
            let flag = typeof  condition === "function" ? condition() : condition;
            if (isPromise(resp)) {
                resp.finally((data) => {

                    lock = data === flag;
                })
            } else {
                lock = resp === flag;
            }

            return resp;
        };

        return target;

    }
}
