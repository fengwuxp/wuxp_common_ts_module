import {Publisher} from "../publishe/Publisher";
import {AbstractTopic} from "./AbstractTopic";


export default class SimpleTopic<T = any> extends AbstractTopic<T> {


    constructor(topicName?: string) {
        super(topicName);
    }

    close = () => {
        if (this.closed) {
            return;
        }
        this.closed = true;
        this.completeHandles
            .filter(item => item != null)
            .forEach(item => item());

    };


    getPublisher = (): Publisher => {

        return {
            publish: (data) => {
                this.tryClosedHandle();
                this.receivers.forEach(receiver => receiver(data));
            }
        };
    };


}
