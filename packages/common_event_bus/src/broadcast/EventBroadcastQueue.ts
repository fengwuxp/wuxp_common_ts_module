import {EventQueue} from "../EventQueue";
import {EventBroadcaster} from "./EventBroadcaster";
import {EventReceiver} from "./EventReceiver";

/**
 * 事件广播队列
 *
 * 可以注册广播事件，并获取事件广播者，和事件接收者
 * @author wxup
 * @create 2018-10-03 20:07
 **/
export interface EventBroadcastQueue<T = any> /*extends EventQueue<T>*/ {


    /**
     * 注册一个广播事件
     * @param category
     * @param eventName
     */
    register: (category: string, eventName: string) => void;


    /**
     * 获取一个广播者
     * @param category
     * @param eventName
     */
    getBroadcaster: (category: string, eventName: string) => EventBroadcaster<any>;


    /**
     * 获取一个消息接收者
     * @param category
     * @param eventName
     */
    getReceiver: (category: string, eventName: string) => EventReceiver<any>;
}
