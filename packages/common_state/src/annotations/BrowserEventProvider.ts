import {SubscriptionEventType} from "../enums/SubscriptionEventType";
import {DataProvider, FunctionDataProvider} from "../provider/DataProvider";

export interface EventProviderOptions {

    /**
     * 事件类型
     * 默认使用SubscriptionEventType.ROUTE
     */
    eventType?: SubscriptionEventType;

    /**
     * 事件名称
     * eventType=SubscriptionEventType.ROUTE时，默认使用当前pathname
     */
    eventName?: string;
}

const defaultOptions: EventProviderOptions = {

    eventType: SubscriptionEventType.ROUTE
};

/**
 * 事件提供者
 * 用于DataProvider或|FunctionDataProvider上，
 * @param options
 * @constructor
 */
export function EventProvider<T extends DataProvider | FunctionDataProvider>(options: EventProviderOptions): Function {


    /**
     * decorator
     * @param  {T} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (target: T, name: string, descriptor: PropertyDescriptor): T {
        if (typeof target === "function") {

        } else {

        }

        return null;
    }
}

abstract class AbstractDataProvider<S> implements DataProvider<S> {

     setState<K extends keyof S>(state: ((prevState: Readonly<S>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null, callback?: () => void): void {


    }


}