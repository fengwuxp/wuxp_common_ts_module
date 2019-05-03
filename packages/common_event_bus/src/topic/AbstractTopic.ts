import {DefaultReceiver, Topic} from "./Topic";
import {SubscriptionHolder} from "../subscription/SubscriptionHolder";
import {Publisher} from "../publishe/Publisher";


export abstract class AbstractTopic<T> implements Topic<T> {

    protected receivers: DefaultReceiver<T>[] = [];

    protected completeHandles: Function[] = [];

    protected closed: boolean = false;

    protected topicName: string;


    constructor(topicName?: string) {
        this.topicName = topicName || "_t_";
    }

    abstract getPublisher: () => Publisher<T>;


    abstract close: () => void;


    subscribe = (receiver: DefaultReceiver<T>, complete?: () => void): SubscriptionHolder => {
        this.tryClosedHandle();
        const isExit = this.receiverIsExit(receiver);
        if (!isExit) {
            this.receivers.push(receiver);
            this.completeHandles.push(complete);
        }

        return this.buildHolder(receiver);
    };


    protected buildHolder = (receiver: DefaultReceiver<T>) => {

        let closed = false;
        const holder: SubscriptionHolder = {

            isClosed: () => closed,

            unsubscribe: (): void => {
                if (closed) {
                    return;
                }
                closed = true;
                let index = 0;
                this.receivers = this.receivers.filter((item, i) => {
                    const b = item === receiver;
                    if (b) {
                        index = i;
                    }

                    return !b;
                });
                this.completeHandles = this.completeHandles.filter((item, i) => i !== index);

            }
        };

        return holder;
    };

    protected receiverIsExit = (receiver: DefaultReceiver) => {

        return this.receivers.some((item) => {
            return receiver === item;
        });
    };

    protected tryClosedHandle = () => {
        if (this.closed) {
            throw new Error("topic is closed");
        }
    }
}