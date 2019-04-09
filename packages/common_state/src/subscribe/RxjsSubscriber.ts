import {Observer, TeardownLogic} from "rxjs";
import {EventPayload} from "../Payload";

// 全局 observer
let globalObserver: Observer<any> = null;


export const rxJsSubscriber = (observer: Observer<any>): TeardownLogic => {
    globalObserver = observer;
    return;
};

export const pushNextEvent = <T extends EventPayload>(value: T) => globalObserver.next(value);

export const pushErrorEvent = <T extends EventPayload>(value: T) => globalObserver.error(value);

export const pushCompletedEvent = () => globalObserver.complete();

export const observerIsClosed = () => globalObserver.closed;