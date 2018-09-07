/**
 * 节流函数
 * 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
 * 节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点，
 * 最好是如我们心意按照一定规律在某个时间间隔内一滴一滴的往下滴
 * 例如: 持续触发scroll事件时，并不立即执行handle函数，每隔1000毫秒才会执行一次handle函数。
 * @author wxup
 * @create 2018-09-06 13:10
 * @param delay 毫秒数
 **/
export function throttle(delay: number) :any {



    /**
     * decorator
     * @param  {T} target              装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 SagaHandler 的某个属性，这个 target 的值就是 SagaHandler.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <T = any>(target: T, name: string, descriptor: PropertyDescriptor): T {

        let prev = Date.now();
        target[name] = function (...args) {
            // const context = this;
            const now = Date.now();
            if (now - prev >= delay) {
                target[name](...args);
                // target[name].apply(context, ...args);
                prev = Date.now();
            }
        };


        return target;

    }
}
