/**
 * 事件接收者，接收到事件后进行处理
 * @author wxup
 * @create 2018-10-03 20:11
 **/

export interface EventReceiver<T> {


    /**
     * 接收广播事件
     * @param handle
     */
    receive: (handle: (data: T) => void) => void;
}
