import {WebSocketAdapter} from "../adapter/WebSocketAdapter";

export type MessageHandle<T=any> = (message: T, socket: WebSocketAdapter) => void;

/**
 * web socket 消息处理者
 */
export interface WebSocketMessageHandler {

    [propName: string]: MessageHandle | any

}
