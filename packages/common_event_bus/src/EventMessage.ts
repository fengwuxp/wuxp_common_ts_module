/**
 * 事件消息
 * @author wxup
 * @create 2018-10-02 19:21
 **/

export interface EventMessage<T> {

    /**
     * 事件主题
     */
    subject: string;

    /**
     * 事件名称
     */
    name: string;

    /**
     * 消息数据
     */
    data: T;
}
