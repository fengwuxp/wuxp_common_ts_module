import {EventPublisher} from "../EventPublisher";
import {EventSubscriber} from "../EventSubscriber";

/**
 * 抽象的事件发布者
 * @author wxup
 * @create 2018-10-02 20:05
 **/
export default abstract class AbstractEventPublisher implements EventPublisher    {

    /**
     * 订阅事件的主题
     */
    protected subject: string;


    constructor(subject: string) {
        this.subject = subject;
    }

    publish: (eventName:string) => void;


}



