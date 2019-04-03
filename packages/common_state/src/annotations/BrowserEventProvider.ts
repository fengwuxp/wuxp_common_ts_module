import {SubscriptionEventType} from "../enums/SubscriptionEventType";
import {DataProvider, FunctionDataProvider, StateType} from "../provider/DataProvider";
import {Observer, TeardownLogic} from "rxjs";
import {pushNextEvent} from "../subscribe/RxjsSubscriber";
import ProxyFactory from "../../../common_proxy/src/ProxyFactory";
import {AbstractDataProvider} from "../provider/AbstractDataProvider";

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

            //函数式数据提供者

            const _target = target as Function;
            const fnName = _target.name;

            return async function (...args) {
                const value = await _target(...args);
                // this.state = value;
                pushNextEvent({
                    eventName: parseFunctionNameToEventName(fnName),
                    eventType: options.eventType.toString(),
                    value
                });
            } as any;

        } else {

            //@ts-ignore
            class AutoGenProvider extends AbstractDataProvider<any> implements DataProvider {

                constructor(state?: StateType<any, any>) {
                    super(state, options, new (target as any)());
                }

            }
            //自动生成的Provider
            return AutoGenProvider as any;
        }
    }
}

const methodNamePrefix = ["get", "load", "find", "query"];

export const parseFunctionNameToEventName = (methodName: string) => {

    let name = methodName;
    methodNamePrefix.filter((item) => {
        return name.startsWith(item);
    }).forEach((item) => {
        name = name.replace(item, "");
    });

    return name;

};

