/**
 * 事件广播者，负责广播事件
 * @author wxup
 * @create 2018-10-03 20:05
 **/

export interface EventBroadcaster<T> {

    /**
     * 发送事件
     * @param data
     */
    send: (data: T) => void;

}
