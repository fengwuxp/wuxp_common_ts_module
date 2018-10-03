/**
 * 事件订阅者
 * @author wxup
 * @create 2018-10-02 19:35
 **/

export interface EventSubscriber<T = any> {

    /**
     * 订阅
     * @param handle
     */
    subscribe: (handle: (data: T) => void) => void;
}
