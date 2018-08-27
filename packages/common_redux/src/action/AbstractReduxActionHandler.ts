import {ReduxActionHandler} from "./ReduxActionHandler";
import {ReduxAction} from "./ReduxAction";
import ReducerRegistry from "../registry/ReducerRegistry";
import {Store} from "redux";


/**
 * 抽象实现
 */
export default abstract class AbstractReduxActionHandler<T> implements ReduxActionHandler<T> {

    protected store: Store;


    putEvent = (action: ReduxAction<T> | any) => {

        if (this.store == null) {
            this.store = ReducerRegistry.storeRepository.getStore();
        }
        return this.store.dispatch(action);

    };


}