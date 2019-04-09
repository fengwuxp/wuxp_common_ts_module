import {SubscriptionEventType} from "../enums/SubscriptionEventType";
import {DataProvider, FunctionDataProvider, StateType} from "../provider/DataProvider";
import {pushNextEvent} from "../subscribe/RxjsSubscriber";
import {BaseEventOptions, genEventName} from "../store/BaseEventOptions";
import {transformInitialLetterLowercase} from "../../../common_utils/src/string/LetterUtils";
import ProxyFactory from "common_proxy/src/ProxyFactory";

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

        if (target["prototype"] == null) {
            //函数式数据提供者
            const _target = target as Function;
            const fnName = _target.name;
            return async function (...args) {
                const value = wrapperFunctionReturnResult(fnName, _options, await _target(...args));
                pushNextEvent({
                    eventName: genEventName(_options),
                    eventType: _options.eventType.toString(),
                    value
                });
                return value;
            } as any;

        } else {

            //@ts-ignore
            class AutoGenProvider<S> extends target<S> implements DataProvider {

                /**
                 *
                 * @param initState
                 */
                constructor(initState?: StateType<S, any>) {
                    super();
                    const proxyInstanceEnhance = ProxyFactory.newProxyInstanceEnhance(this,
                        (provider: AutoGenProvider, propertyKey: PropertyKey, receiver: any) => {
                            const action = provider[propertyKey];

                            return async function (...args) {

                                const result = await action(...args);
                                const value = propertyKey === "defaultState" ? result :
                                    wrapperFunctionReturnResult(propertyKey as string, _options, result);
                                const eventName = genEventName(_options);
                                pushNextEvent({
                                    eventName,
                                    eventType: _options.eventType.toString(),
                                    value
                                });

                                return result;
                            }

                        }, (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {

                            return async function (...args) {

                            }

                        });
                    //初始化state
                    (proxyInstanceEnhance as DataProvider).defaultState();
                    return proxyInstanceEnhance;
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

    result[transformInitialLetterLowercase(name)] = value;

    return result;
};

