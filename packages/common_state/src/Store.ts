/**
 * 数据仓库，负责监听数据变更、查询、存储、更新、移除数据
 */
export interface Store<T> {

    /**
     * 存入数据
     * @param args
     */
    deposit: (...args) => void;

}

export interface TransferStore<T> extends Store<T> {

    /**
     * 中转数据
     * @param args
     */
    // transfer: (...args) => void;
}




