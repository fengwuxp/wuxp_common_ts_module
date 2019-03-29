import {Observable, Observer} from "rxjs";
import {Subscriber} from "rxjs/src/internal/Subscriber";
import {TeardownLogic} from "rxjs/src/internal/types";
import {EventPayload} from "./Payload";
import {KeyValueDatabase} from "./databse/KeyValueDatabase";

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
    transfer: (...args) => void;
}


/**
 * 事件驱动的 store
 *
 * 当数据仓库中的任意数据发生变化时，仓库会把数据的变化广播给所有的数据持有者
 *
 * 实现思路：1. 需要一个数据存储，这个存储在数据被更新时会触发广播
 *         2: 订阅者按照事件类型定订阅事件，得到和事件类型相关的数据
 */
export interface EventDrivenStore<T> extends TransferStore<T> {

}

// interface EventDrivenReceiver<T> {
//
//     /**
//      * 接收事件消息
//      * @param sate
//      */
//     receiveEventMessage: (sate: T) => void;
// }

export  type EventReceiver<T = any> = (state: T) => void;


export default abstract class AbstractStore<T extends EventPayload> implements EventDrivenStore<T> {

    private observable: Observable<T>;


    //事件接收者
    private eventReceiver: KeyValueDatabase<EventReceiver[]> = new Map();

    constructor(subscribe: (observer: Observer<T>) => TeardownLogic) {

        const observable = new Observable<T>(subscribe);

        observable.subscribe(
            //next
            this.onNext,

            //error
            this.onError,

            //complete
            this.onComplete
        );

        this.observable = observable;
    }


    deposit: (...args) => void;

    transfer: (...args) => void;


    /**
     * 接收到一个消息体，将这个消息广播给所有相关的接收这个
     * @param payload
     */
    protected onNext = (payload: EventPayload) => {
        const receivers: EventReceiver[] = this.eventReceiver.get(this.genEventKey(payload));
        if (receivers == null) {
            return;
        }
        receivers.forEach((receiver) => receiver(payload.value));
    };

    protected onError = (error) => {

    };

    protected onComplete = () => {

    };


    private genEventKey = (payload: EventPayload) => {

        return `${payload.eventType}_${payload.eventName}`;
    }

}