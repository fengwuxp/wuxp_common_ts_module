import {EventBroadcastQueue} from "./EventBroadcastQueue";
import {EventBroadcaster} from "./EventBroadcaster";
import {EventReceiver} from "./EventReceiver";

/**
 * 简单的事件广播队列
 * @author wxup
 * @create 2018-10-05 17:03
 **/
export default class SimpleEventBroadcastQueue implements EventBroadcastQueue {

    protected eventMap: Map<string, Map<string, Function>> = new Map<string, Map<string, Function>>();

    get: (category: string, eventName: string) => any;

    getBroadcaster = (category: string, eventName: string): EventBroadcaster<any> => {


        return null;
    };

    getReceiver: (category: string, eventName: string) => EventReceiver<any>;

    register: (category: string, eventName: string) => void;


}

class SimpleEventBroadcaster implements EventBroadcaster<any> {

    private handleMap: Map<string, Function>;

    private receiverName: string;

    send: (data: any) => void;

}

class SimpleEventReceiver implements EventReceiver<any> {

    private handleMap: Map<string, Function>;

    private receiverName: string;


    constructor(handleMap: Map<string, Function>, receiverName: string) {
        this.handleMap = handleMap;
        this.receiverName = receiverName;
    }

    receive = (handle: (data: any) => void) => {
        this.handleMap.set(this.receiverName, handle);
    };


}
