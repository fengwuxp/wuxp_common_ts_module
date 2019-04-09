import {KeyValueDatabase} from "../databse/KeyValueDatabase";
import {EventReceiver} from "./EventReceiver";
import {BaseEventOptions} from "../store/BaseEventOptions";


const EVENT_RECEIVER_STORE: KeyValueDatabase<EventReceiver[]> = new Map();


export const pushEventReceiver = (options: BaseEventOptions, ...receivers: EventReceiver[]) => {

    const eventKey = genEventKey(options);
    const receiverList = EVENT_RECEIVER_STORE.get(eventKey) || [];

    receiverList.push(...receivers);

    EVENT_RECEIVER_STORE.set(eventKey, receiverList);

};

export const removeEventReceiver = (options: BaseEventOptions, ...receivers: EventReceiver[]) => {
    const eventKey = genEventKey(options);
    const receiverList = EVENT_RECEIVER_STORE.get(eventKey) || [];

    const result = receiverList.filter((item) => {
        return receivers.indexOf(item) >= 0;
    });
    EVENT_RECEIVER_STORE.set(eventKey, result);

};


export const genEventKey = (options: BaseEventOptions) => {

    return `${options.eventType}_${options.eventName}`;
};

export const getEventReceiverStore = () => EVENT_RECEIVER_STORE;