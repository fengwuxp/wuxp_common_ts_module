import {WebSocketLifeCycleHandler} from "./core/WebSocketLifeCycleHandler";
import {WebSocketAdapter, WebSocketOptions} from "./adapter/WebSocketAdapter";
import {WebSocketMessageRouter} from "./core/WebSocketMessageRouter";
import WebSocketFactory from "./factory/WebSocketFactory";
import {isNullOrUndefined} from "util";
import {WebSocketHolder} from "./core/WebSocketHolder";

/**
 * 抽象的webSocket 处理者
 */
export default abstract class AbstractWebSocketHandler implements WebSocketLifeCycleHandler, WebSocketHolder {

    //消息路由
    protected messageRouter: WebSocketMessageRouter;

    //web socket 实例
    protected webSocket: WebSocketAdapter;

    //连接配置
    private webSocketOptions: WebSocketOptions;

    //是否允许重新连接
    protected allowReconnect: boolean = true;

    constructor(messageRouter: WebSocketMessageRouter, options?: WebSocketOptions,) {
        this.messageRouter = messageRouter;

        this.webSocketOptions = {...options};
    }

    abstract onClose: (event: CloseEvent) => void;

    abstract onError: (event: Event) => void;


    close = (code?: number, reason?: string, allowReconnect?: boolean) => {
        this.webSocket.close(code, reason);
        if (isNullOrUndefined(allowReconnect)) {
            this.allowReconnect = allowReconnect;
        }
    };


    connection = (options?: WebSocketOptions) => {

        if (this.allowReconnect) {
            throw new Error("不允许重新连接");
        }

        if (!isNullOrUndefined(options)) {
            this.webSocketOptions = options;
        }

        this.webSocket = WebSocketFactory.factory(this.webSocketOptions, this);
    };

    getWebSocket = () => this.webSocket;


    onOpen = (event: Event) => {
        //发送心跳
        this.sendHeartbeatPackage(this.webSocket);
    };


    onMessage = (event: MessageEvent) => {
        this.messageRouter.routes(event, this.webSocket);
    };

    /**
     * 发送心跳包
     */
    protected abstract sendHeartbeatPackage: (socket: WebSocketAdapter) => void;

}