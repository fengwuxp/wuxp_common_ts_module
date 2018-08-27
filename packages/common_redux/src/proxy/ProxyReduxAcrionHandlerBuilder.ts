import {ReduxActionHandler} from "../action/ReduxActionHandler";
import {ReducerHolder} from "../reducer/ReducerHolder";


export default class ProxyReduxAcrionHandlerBuilder {


    public static build<T>(handler:ReduxActionHandler<T>):ReduxActionHandler{

        return new Proxy(handler,{

            get: (target: ReduxActionHandler<T>, p: PropertyKey, receiver: any): any => {

            }
        });
    }
}