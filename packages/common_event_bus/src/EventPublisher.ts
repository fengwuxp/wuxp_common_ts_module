/**
 * 事件发布者
 * @author wxup
 * @create 2018-10-02 19:30
 **/

export interface EventPublisher {

    /**
     * 发布事件
     * @param eventName 事件名称
     */
    publish: (eventName: string) => void;

}
