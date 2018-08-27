import {ReducerHolder} from "../reducer/ReducerHolder";
import ReducerRegistry from "../registry/ReducerRegistry";
import {DEFAULT_UPDATE_KEY} from "../reducer/ReducerFactory";


/**
 * 构建一个代理的 reducer holder
 */
export default class ProxyReducerHolderBuilder {


    public static build<T extends ReducerHolder<any>>(holder: T): T {

        const constructorName = holder.constructor.name;
        const store = ReducerRegistry.storeRepository.getStore();
        return new Proxy(holder, {
            get: (target: T, p: PropertyKey, receiver: any): any => {


                return (payload) => {
                    const action = {
                        type: `${constructorName}.${p as string}`,
                        payload
                    };
                    if (p === DEFAULT_UPDATE_KEY) {
                        //分发到reducer
                        return store.dispatch(action);
                    } else {
                        return action;
                    }


                };
            }
        });
    }
}
