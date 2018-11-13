import {isPromise} from "common_utils/src/fn/isPromise";

/**
 * 在方法执行之前执行
 * @author wxup
 * @create 2018-09-06 14:25
 **/

export function eventBefore(event: Function, ...p): any {

    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，\\
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {


        target[name] = function (...args) {
            const resp = event(...p);
            if (isPromise(resp)) {
                //promise
                resp.finally(() => {
                    target[name](...args);
                });
            } else {
                target[name](...args);
            }

        };

        return target;

    }
}
