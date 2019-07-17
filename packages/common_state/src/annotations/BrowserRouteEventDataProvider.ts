import {AbstractDataProvider, DataProvider, FunctionDataProvider, StateType} from "../provider/DataProvider";
import ProxyFactory from "fengwuxp_common_proxy/src/ProxyFactory";
import {transformInitialLetterLowercase} from "fengwuxp_common_utils/src/string/LetterUtils";
import TopicManager from "fengwuxp_common_event_bus/src/DefaultTopicManager";
import {ApplicationTopicType} from "../enums/ApplicationTopicType";
import {Payload} from "../Payload";
import {Publisher} from "fengwuxp_common_event_bus/src/publishe/Publisher";
import {Provider} from "react";


type GenPayLoadType = () => string;

export interface WrapperDataProviderOptions {

    /**
     * 主题名称
     * 默认
     */
    topicName?: string;

    /**
     * 负载类型
     */
    payLoadType?: string | GenPayLoadType;

}

const defaultOptions: WrapperDataProviderOptions = {

    topicName: ApplicationTopicType.ROUTE,

    payLoadType: () => {
        return location.pathname
    },
};


const ignoreMethodNames = ["setState"];

/**
 * 数据提供者
 * 用于DataProvider或|FunctionDataProvider上，
 * @param options
 * @constructor
 */
export function WrapperDataProvider<T extends DataProvider>(options?: WrapperDataProviderOptions): Function {


    const _options: WrapperDataProviderOptions = {
        ...defaultOptions,
        ...(options || {})
    };

    /**
     * decorator
     * @param  {T} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (Provider: { new(...args: any[]): {} }, name: string, descriptor: PropertyDescriptor) {

        console.log("create proxy data provider", _options);

        const defaultProvider = new Provider();
        return class AutoGenDataProvider implements DataProvider<any> {


            protected state: any = {};

            constructor() {


                //通过代理返回
                const genDataProvider = ProxyFactory.newProxyInstanceEnhance({
                        ...this,
                        ...defaultProvider
                    },
                    (provider: AutoGenDataProvider, propertyKey: PropertyKey, receiver: any) => {

                        const actionFunction = propertyKey === "defaultState" ? defaultProvider[propertyKey as string] : provider[propertyKey as string];


                        return async (...args) => {

                            const result = await actionFunction(...args);
                            if (ignoreMethodNames.indexOf(propertyKey as string) >= 0) {
                                return result;
                            }
                            if (result === undefined) {
                                return;
                            }
                            const newSate = {};
                            const stateAttrName = defaultConverterMethodNameToStateAttrName(propertyKey as string);
                            newSate[stateAttrName] = result;
                            provider.setState(newSate);
                            return result;
                        }

                    },
                    (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {
                        return () => {
                            throw new Error(`no such method ${propertyKey as string}`);
                        }
                    });

                const initFun = async () => {
                    //初始化state
                    const state = await genDataProvider.defaultState();
                    this.setState(state || {});
                };

                initFun();

                return genDataProvider;

            }

            setState = <K extends keyof any>(state: StateType<any, K>) => {
                const topic = TopicManager.getTopic<Payload>(_options.topicName);
                this.state = {
                    ...this.state,
                    ...state
                };
                const payLoadType = _options.payLoadType;
                const publisher = topic.getPublisher();
                publisher.publish({
                    type: typeof payLoadType === "function" ? payLoadType() : payLoadType,
                    value: this.state
                });
            };

            defaultState: <K extends keyof any>() => (StateType<any, K> | Promise<StateType<any, K>>);


        }

    }
}

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

let defaultConverterMethodNameToStateAttrName: ConverterMethodNameToStateAttrName = simpleConverterMethodNameToStateAttrName;


//设置默认的方法名称转换为属性名称的策略
export const setDefaultConverterMethodNameToStateAttrName = () => defaultConverterMethodNameToStateAttrName = simpleConverterMethodNameToStateAttrName;


