import {Publisher} from "../publishe/Publisher";
import {Observable, Observer, Subscription} from "rxjs";
import {AbstractTopic} from "./AbstractTopic";


export default class RxjsTopic<T = any> extends AbstractTopic<T> {


    protected observable: Observable<T>;

    protected observer: Observer<T>;

    protected subscription: Subscription;


    constructor(topicName?:string) {
        super(topicName);

        this.observable = new Observable((observer: Observer<T>) => {
            this.observer = observer;
        });
        this.subscription = this.observable.subscribe(
            (value: T) => {
                this.receivers.forEach(receiver => receiver(value));
            },
            (error) => {
                console.log(error);
            },
            () => {
                this.completeHandles
                    .filter(item => item != null)
                    .forEach(item => item());
            }
        );
    }

    close = () => {
        if (this.observer.closed) {
            return;
        }
        this.observer.complete();
    };


    getPublisher = (): Publisher<T> => {

        return {
            publish: (data) => {
                this.observer.next(data);
            }
        };
    };


}