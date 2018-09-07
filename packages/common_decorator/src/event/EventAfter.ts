import {isPromise} from "common_utils/src/fn/isPromise";

/**
 * 在方法执行之后执行
 * @author wxup
 * @create 2018-09-06 14:25
 **/
export function eventAfter(event: Function, ...p) :any {

    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {


        target[name] = function (...args) {
            const resp = target[name](...args);
            if (isPromise(resp)) {
                //promise
                resp.finally(() => {
                    event(...p);
                });
            } else {
                event(...p);
            }
        };

        return target;

    }
}
