import {DataProvider, StateType} from "./DataProvider";
import ProxyFactory from "common_proxy/src/ProxyFactory";
import {pushNextEvent} from "../subscribe/RxjsSubscriber";
import {EventProviderOptions, parseFunctionNameToEventName} from "../annotations/BrowserEventProvider";


export abstract class AbstractDataProvider<S extends object> implements DataProvider<S> {

    state: S = null;


    /**
     *
     * @param initState
     * @param options
     * @param combinedProvider
     */
    constructor(initState?: StateType<S, any>,
                options?: EventProviderOptions,
                combinedProvider?: DataProvider<any> | any) {
        this.initState(initState);

        return ProxyFactory.newProxyInstanceEnhance({
                ...this,
                ...(combinedProvider || {})
            },
            (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {
                return async function (...args) {
                    const action = provider[propertyKey];
                    const value = await action(...args);
                    const eventName = parseFunctionNameToEventName(propertyKey as string);
                    pushNextEvent({
                        eventName,
                        eventType: options.eventType.toString(),
                        value
                    });
                    const state = {};
                    // state[eventName] = value;
                    provider.setState(state)
                }

            }, (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {

                return async function (...args) {

                }

            });
    }

    setState = <K extends keyof S>(state: StateType<S, K>, callback?: () => void) => {
        this.state = {
            ...this.state,
            ...(state || {})
        };
        if (callback != null) {
            callback();
        }
    };


    private initState = async (state?: StateType<S, any>) => {
        const defaultState = await this.defaultState();
        this.state = {
            ...(defaultState || defaultState),
            ...(state || {})
        } as S;
    };

    abstract defaultState?: <K extends keyof S>() => StateType<S, K> | Promise<StateType<S, K>>;


}