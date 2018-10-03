import {EventSubscriber} from "../EventSubscriber";
import {EventPublisher} from "../EventPublisher";

/**
 * 抽象的事件队列
 * @author wxup
 * @create 2018-10-02 21:12
 **/

export default abstract class AbstractEventQueue {


    getPublisher: () => EventPublisher;

    /**
     * 获取一个订阅者
     * @param eventName
     */
    getSubscriber: (eventName: string) => EventSubscriber;
}


class SimpleEventSubscriber implements EventSubscriber{

    /**
     * 订阅事件的主题
     */
    private subject: string;

    /**
     * 订阅事件的名称
     */
    private name:string;

    private eventMap:Map<string,EventSubscriber>;


    constructor(eventMap: Map<string, EventSubscriber>) {
        this.eventMap = eventMap;
    }

    subscribe= (handle: (data: any) => void) => {

    };




}
