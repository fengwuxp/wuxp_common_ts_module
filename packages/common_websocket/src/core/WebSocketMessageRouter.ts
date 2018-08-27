import {WebSocketAdapter} from "../adapter/WebSocketAdapter";

/**
 * web socket 消息路由者，可以自行定义消息路由策略
 */
export interface WebSocketMessageRouter {


    /**
     * 进行消息路由
     * @param {MessageEvent} event
     * @param {WebSocketAdapter} socket
     */
    routes: (event: MessageEvent, socket: WebSocketAdapter) => void
}
