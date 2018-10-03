import {EventSubscriber} from "../EventSubscriber";
import {EventQueue} from "../EventQueue";

/**
 * 抽象的订阅的订阅者
 * @author wxup
 * @create 2018-10-02 19:59
 **/
export default abstract class AbstractEventSubscriber<T> implements EventSubscriber<T> {

    /**
     * 订阅事件的主题
     */
    protected subject: string;

    /**
     * 订阅事件的名称
     */
    protected name: string;


    constructor(subject: string, name: string) {
        this.subject = subject;
        this.name = name;
    }

    abstract subscribe: (handle: (data: T) => void) => void;



}
