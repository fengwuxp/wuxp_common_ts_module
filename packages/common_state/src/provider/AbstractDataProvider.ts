// import {DataProvider, StateType} from "./DataProvider";
// import ProxyFactory from "common_proxy/src/ProxyFactory";
// import {pushNextEvent} from "../subscribe/RxjsSubscriber";
// import {
//     EventProviderOptions, wrapperFunctionReturnResult,
// } from "../annotations/BrowserEventProvider";
// import {genEventName} from "../store/BaseEventOptions";
//
//
// const ignoreNames = [
//     "defaultState",
//     "setState"
// ];
//
// export abstract class AbstractDataProvider<S extends object> implements DataProvider<S> {
//
//     protected state: S = null;
//
//
//     /**
//      *
//      * @param initState
//      * @param options
//      * @param combinedProvider
//      */
//     constructor(initState?: StateType<S, any>,
//                 options?: EventProviderOptions,
//                 combinedProvider?: DataProvider<any> | any) {
//
//
//         const proxyInstance = ProxyFactory.newProxyInstanceEnhance({
//                 ...this,
//                 ...(combinedProvider || {})
//             },
//             (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {
//
//                 const action = provider[propertyKey];
//                 if (ignoreNames.indexOf(propertyKey as string) >= 0) {
//                     return action;
//                 }
//
//                 return async function (...args) {
//
//                     const result = await action(...args);
//                     const newState = wrapperFunctionReturnResult(propertyKey as string, options, result);
//                     provider.setState(newState);
//
//                     const eventName = genEventName(options);
//                     const value = (provider as AbstractDataProvider).state;
//                     pushNextEvent({
//                         eventName,
//                         eventType: options.eventType.toString(),
//                         value
//                     });
//
//                     return result;
//                 }
//
//             }, (provider: DataProvider, propertyKey: PropertyKey, receiver: any) => {
//
//                 return async function (...args) {
//
//                 }
//
//             });
//
//
//         (proxyInstance as AbstractDataProvider).initState(proxyInstance as DataProvider, initState);
//         return proxyInstance;
//     }
//
//     setState = <K extends keyof S>(state: StateType<S, K>, callback?: () => void) => {
//         this.state = {
//             ...(this.state || {} as any),
//             ...(state || {})
//         };
//         if (callback != null) {
//             callback();
//         }
//     };
//
//
//     private initState = async (provider: DataProvider<S>, initState?: StateType<S, any>) => {
//         let defaultState;
//         try {
//             defaultState = await provider.defaultState();
//         } catch (e) {
//             console.error(e);
//         }
//         const state: S = {
//             ...(defaultState || {}),
//             ...(initState || {})
//         };
//         this.state = state;
//     };
//
//     defaultState: <K extends keyof S>() => StateType<S, K> | Promise<StateType<S, K>>;
//
//
// }