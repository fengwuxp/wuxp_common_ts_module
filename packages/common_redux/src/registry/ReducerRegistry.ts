import {Registry} from "fengwuxp_common_core/src/registry/Registry";
import {Reducer} from "redux";
import {StoreRepository} from "../store/StoreRepository";


/**
 * 动态注册reducer
 * 在注册之前必须先初始化store
 */
export default class ReducerRegistry implements Registry<Reducer> {


    public static storeRepository: StoreRepository<any>;

    get: () => Reducer;

    register = (reducer: Reducer) => {
        let storeRepository = ReducerRegistry.storeRepository;
        if (storeRepository == null) {
            console.error("redux store 尚未初始化");
            return;
        }

        const store = storeRepository.getStore();

        store.replaceReducer(reducer);

    };


}