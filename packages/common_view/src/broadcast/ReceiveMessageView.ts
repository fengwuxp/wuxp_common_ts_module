/**
 * 接受消息的视图
 */
export interface ReceiveMessageView {

    /**
     * 接收事件消息
     * @param p
     */
    receiveEvent: (...p) => void;
}