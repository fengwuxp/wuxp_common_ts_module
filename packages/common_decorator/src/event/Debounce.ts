/**
 * 去抖函数
 *（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
 * 如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
 * @author wxup
 * @create 2018-09-06 13:10
 *
 * @param times 毫秒数
 **/
export function debounce(times: number) :any {

    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {

        let timerId;
        target[name] = function (...args) {
            if (timerId != null) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                target[name](...args)
            }, times)
        };


        return target;

    }
}
