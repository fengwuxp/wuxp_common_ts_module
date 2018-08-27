import {Store} from "redux";


export interface StoreRepository<T> {


    /**
     * 初始化
     * @param args
     */
    init: (...args) => Store<T>;


    getStore: () => Store<T>;
}