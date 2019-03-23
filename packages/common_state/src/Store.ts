import {Observable, Observer} from "rxjs";
import {Subscriber} from "rxjs/src/internal/Subscriber";
import {TeardownLogic} from "rxjs/src/internal/types";

/**
 * 数据仓库，负责监听数据变更、查询、存储、更新、移除数据
 * 当数据仓库中的任意数据发生变化时，仓库会把数据的变化广播给所有的数据持有者
 *
 * 实现思路：1. 需要一个数据存储，这个存储在数据被更新时会触发广播
 *         2: 订阅者按照事件类型定订阅事件，得到和事件类型相关的数据
 */
export interface Store<T> {


}

/**
 * 数据监听者
 */
export interface DataListener {

    monitor: () => void;
}

export interface MemoryStore<T> extends Store<T> {

}

export default abstract class AbstractStore<T> implements Store<T> {

    private observable: Observable<T>;

    // private store: {} = {};

    constructor(subscribe: (observer: Observer<T>) => TeardownLogic) {

        const observable = new Observable<T>((observer: Observer<T>) => {

        });

        observable.subscribe(
            //next
            (value) => {

            },

            //error
            (x) => {

            },
            //complete
            () => {

            });

        this.observable = observable;
    }
}