import {BaseEventOptions, genEventName} from "../store/BaseEventOptions";
import {SubscriptionEventType} from "../enums/SubscriptionEventType";
import {pushEventReceiver} from "../receiver/EventRecelverRegistrationCenter";
import {EventReceiver} from "../receiver/EventReceiver";


export interface EventReceiverOptions extends BaseEventOptions {

}

const defaultOptions: EventReceiverOptions = {

    eventType: SubscriptionEventType.ROUTE,

};

/**
 * 事件接收者
 * @param options
 * @constructor
 */
export function BrowserEventReceiver<T = EventReceiver>(options: EventReceiverOptions) {

    const _options = {
        ...defaultOptions,
        ...options
    };

    /**
     * decorator
     * @param  {T} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (target: T, name: string, descriptor: PropertyDescriptor): T {


        const receiver: EventReceiver = (...args) => {
            if (target.constructor == null) {

                //函数式数据提供者
                return (target as Function)(...args);

            } else {

                return new (target as any)(...args);
            }
        };

        pushEventReceiver(_options, receiver);


        return receiver as T;
    }

}