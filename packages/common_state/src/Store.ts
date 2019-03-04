/**
 * 数据仓库，负责查询、存储、更新、移除数据
 * 当数据仓库中的任意数据发生变化时，仓库会把数据的变化广播给所有的数据持有者
 */
export interface Store<T> {

    

}

export interface MemoryStore<T> extends Store<T>{

}