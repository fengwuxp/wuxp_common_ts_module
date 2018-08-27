type MessageHandle<T=any> = (message: T, socket: WebSocket) => void;

/**
 * web socket 消息处理者
 */
export interface WebSocketMessageHandler {

    [propName: string]: MessageHandle | any

}