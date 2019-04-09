import {SubscriptionEventType} from "../enums/SubscriptionEventType";
import {DataProvider, FunctionDataProvider, StateType} from "../provider/DataProvider";
import {Observer, TeardownLogic} from "rxjs";
import {pushNextEvent} from "../subscribe/RxjsSubscriber";
import {AbstractDataProvider} from "../provider/AbstractDataProvider";
import {BaseEventOptions, genEventName} from "../store/BaseEventOptions";

export interface EventProviderOptions extends BaseEventOptions {

    /**
     * state的名称
     */
    stateName?: string;

    /**
     * 使用自动计算state的名称
     * 默认true
     */
    autoStateName?: boolean;
}


const defaultOptions: EventProviderOptions = {

    eventType: SubscriptionEventType.ROUTE,

    autoStateName: true
};

/**
 * 事件提供者
 * 用于DataProvider或|FunctionDataProvider上，
 * @param options
 * @constructor
 */
export function EventProvider<T extends DataProvider | FunctionDataProvider>(options: EventProviderOptions): Function {


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

        if (typeof target === "function") {

            //函数式数据提供者
            const _target = target as Function;
            const fnName = _target.name;
            return async function (...args) {
                const value = wrapperFunctionReturnResult(fnName, _options, await _target(...args));
                this.__state__ = value;
                pushNextEvent({
                    eventName: genEventName(_options),
                    eventType: _options.eventType.toString(),
                    value
                });
            } as any;

        } else {

            //@ts-ignore
            class AutoGenProvider extends AbstractDataProvider<any> implements DataProvider {

                constructor(state?: StateType<any, any>) {
                    super(state, _options, new (target as any)());
                }
            }

            //自动生成的Provider
            return AutoGenProvider as any;
        }
    }
}


const methodNamePrefix = ["get", "load", "find", "query"];

export const wrapperFunctionReturnResult = (methodName: string, options: EventProviderOptions, value: any) => {
    const result = {};
    if (options.stateName) {
        result[options.stateName] = value;
        return result;
    }
    if (!options.autoStateName) {
        return value;
    }

    let name = methodName;
    methodNamePrefix.filter((item) => {
        return name.startsWith(item);
    }).forEach((item) => {
        name = name.replace(item, "");
    });

    if (name === methodName) {
        return value;
    }


    if (value === null) {
        result[name] = value;
    }

    return result;
};

