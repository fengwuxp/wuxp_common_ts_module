/**
 * 事件接收者
 */
export  type EventReceiver<T = any> = (state: T) => void;