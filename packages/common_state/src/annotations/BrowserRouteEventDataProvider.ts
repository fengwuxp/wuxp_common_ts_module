import {DataProvider, FunctionDataProvider, StateType} from "../provider/DataProvider";
import ProxyFactory from "common_proxy/src/ProxyFactory";
import {transformInitialLetterLowercase} from "common_utils/src/string/LetterUtils";
import TopicManager from "common_event_bus/src/DefaultTopicManager";
import {ApplicationTopicType} from "../enums/ApplicationTopicType";
import {Payload} from "../Payload";
import {Publisher} from "common_event_bus/src/publishe/Publisher";


type GenPayLoadType = () => string;

export interface WrapperDataProviderOptions {

    /**
     * 主题名称
     * 默认
     */
    topicName?: string;

    payLoadType?: string | GenPayLoadType;

}

const defaultOptions: WrapperDataProviderOptions = {

    topicName: ApplicationTopicType.ROUTE,

    payLoadType: () => {
        return location.pathname
    },
};


const ignoreMethodNames = ["defaultState", "setState"];

/**
 * 数据提供者
 * 用于DataProvider或|FunctionDataProvider上，
 * @param options
 * @constructor
 */
export function WrapperDataProvider<T extends DataProvider | FunctionDataProvider>(options: WrapperDataProviderOptions): Function {


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

            protected publisher: Publisher<Payload>;

            protected state: S;

            async constructor() {
                super();

                const topic = TopicManager.getTopic<Payload>(_options.topicType);

                this.publisher = topic.getPublisher();
                //初始化state
                this.state = await this.defaultState();
                //通过代理返回
                return ProxyFactory.newProxyInstanceEnhance(this,
                    (provider: AutoGenDataProvider, propertyKey: PropertyKey, receiver: any) => {


                        const actionFunction = provider[propertyKey];

                        return async (...args) => {

                            const result = await actionFunction(...args);
                            if (ignoreMethodNames.indexOf(propertyKey as string) >= 0) {
                                return result;
                            }
                            if (result === undefined) {
                                return
                            }
                            const newSate = {};
                            const stateAttrName = defaultConverterMethodNameToStateAttrName(propertyKey as string);
                            newSate[stateAttrName] = result;
                            provider.setState(newSate);
                            return result;
                        }

                    }, (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {

                        return () => throw new Error(`no such method ${propertyKey}`);

                    });

            }

            setState = <K extends keyof S>(state: StateType<S, K>) => {

                this.state = {
                    ...this.state,
                    ...state
                };

                const payLoadType = _options.payLoadType;

                this.publisher.publish({
                    type: typeof payLoadType === "function" ? payLoadType() : payLoadType,
                    value: this.state
                })
            };

        }

        return AutoGenDataProvider as T;
    }
}

let defaultConverterMethodNameToStateAttrName: ConverterMethodNameToStateAttrName = simpleConverterMethodNameToStateAttrName;

export const setDefaultConverterMethodNameToStateAttrName = () => defaultConverterMethodNameToStateAttrName = simpleConverterMethodNameToStateAttrName;


/**
 * 转换方法名称为sate属性的名称
 */
export type ConverterMethodNameToStateAttrName = (methodName: string) => string;


const methodNamePrefix = ["get", "load", "find", "query"];


const simpleConverterMethodNameToStateAttrName: ConverterMethodNameToStateAttrName = (methodName: string) => {
    let name = methodName;
    methodNamePrefix.filter((item) => {
        return name.startsWith(item);
    }).forEach((item) => {
        name = name.replace(item, "");
    });

    if (name === methodName) {
        return name;
    }

    return transformInitialLetterLowercase(name);
};

