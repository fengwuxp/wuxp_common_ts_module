import {DefaultReceiver, Topic} from "./Topic";
import {SubscriptionHolder} from "../subscription/SubscriptionHolder";
import {Publisher} from "../publishe/Publisher";


export abstract class AbstractTopic<T> implements Topic<T> {

    protected receivers: DefaultReceiver<T>[] = [];

    protected completeHandles: Function[] = [];

    protected closed: boolean = false;

    protected topicName: string;


    constructor(topicName?: string) {
        this.topicName = topicName || "_T_";
    }

    abstract getPublisher: () => Publisher<T>;


    abstract close: () => void;


    subscribe = (receiver: DefaultReceiver<T>, complete?: () => void): SubscriptionHolder => {
        this.tryClosedHandle();
        let index = this.receiverIsExit(receiver);
        if (index < 0) {
            //不存在
            this.receivers.push(receiver);
            this.completeHandles.push(complete);
            index = this.receivers.length - 1;
        }

        return this.buildHolder(receiver, index);
    };


    protected buildHolder = (receiver: DefaultReceiver<T>, index: number) => {

        let closed = false;
        const holder: SubscriptionHolder = {

            isClosed: () => closed,

            unsubscribe: (): void => {
                if (closed) {
                    return;
                }
                closed = true;
                const filterHandle = (item, i) => i !== index;
                this.receivers = this.receivers.filter(filterHandle);
                this.completeHandles = this.completeHandles.filter(filterHandle);
            }
        };

        return holder;
    };

    protected receiverIsExit = (receiver: DefaultReceiver) => {

        return this.receivers.findIndex((item) => {
            return receiver === item;
        });
    };

    protected tryClosedHandle = () => {
        if (this.closed) {
            throw new Error("topic is closed");
        }
    }
}
