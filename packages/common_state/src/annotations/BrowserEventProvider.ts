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
 * 函数式数据提供者
 */
type FunctionDataProvider<A = any, R = any> = (...args: A[]) => R;


/**
 * 将函数包装为 provider
 * @param options
 * @constructor
 */
export const WrapperMethodToProvider = <A = any, R = any, T extends DataProvider | FunctionDataProvider>(options: EventProviderOptions): (func: FunctionDataProvider<A, R>) =>
    FunctionDataProvider<A, Promise<R>> => {
    const _options = {
        ...defaultOptions,
        ...options
    };
    return (func: FunctionDataProvider): FunctionDataProvider<A, Promise<R>> => {
        //函数式数据提供者
        const fnName = func.name;
        return async (...args): Promise<any> => {
            const value = wrapperFunctionReturnResult(fnName, _options, await func(...args));
            pushNextEvent({
                eventName: genEventName(_options),
                eventType: _options.eventType.toString(),
                value
            });
            return value;
        }
    }

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
    return function (Provider: T, name: string, descriptor: PropertyDescriptor): T {


        class AutoGenDataProvider<S = any> extends Provider<S> implements DataProvider {

            constructor() {
                super();
                //通过代理返回
                const proxyInstanceEnhance = ProxyFactory.newProxyInstanceEnhance(this,
                    (provider: AutoGenDataProvider, propertyKey: PropertyKey, receiver: any) => {
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

        return AutoGenDataProvider as T;
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

