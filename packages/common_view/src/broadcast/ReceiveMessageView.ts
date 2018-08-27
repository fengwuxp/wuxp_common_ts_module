/**
 * 接受消息的视图
 */
export interface ReceiveMessageView {

    // @ts-ignore
    onMessage: (...p) => void;
}