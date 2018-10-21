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

    /**
     * 连接状态，用于标记当前webSocket的连接状态
     * ios中锁屏后 webSocket连接会被关闭
     */
    protected connectionStatus: boolean;


    constructor(messageRouter: WebSocketMessageRouter, options?: WebSocketOptions,) {
        this.messageRouter = messageRouter;
        this.webSocketOptions = {...options};
    }

    onClose = (event: CloseEvent) => {
        //标记 webSocket 连接状态
        this.connectionStatus = false;
    };

    onError = (event: Event) => {
        console.log("webSocket发生错误", event);
        this.close();
    };


    close = (code?: number, reason?: string, allowReconnect?: boolean) => {
        if (this.webSocket != null) {
            this.webSocket.close(code, reason);
        }
        if (allowReconnect != null) {
            this.allowReconnect = allowReconnect;
        }
        this.connectionStatus = false;
    };


    connection = (options?: WebSocketOptions) => {

        if (this.allowReconnect == false) {
            throw new Error("不允许重新连接");
        }
        if (this.connectionStatus) {
            return;
        }

        if (!isNullOrUndefined(options)) {
            this.webSocketOptions = options;
        }

        this.webSocket = WebSocketFactory.factory(this.webSocketOptions, this);
        this.connectionStatus = true;
    };

    onOpen = (event: Event) => {
        //发送心跳
        this.sendHeartbeatPackage(this.webSocket);
    };


    onMessage = (event: MessageEvent) => {
        this.messageRouter.routes(event, this.webSocket);
    };


    getWebSocket = () => this.webSocket;


    /**
     * 发送心跳包
     */
    protected abstract sendHeartbeatPackage: (socket: WebSocketAdapter) => void;

}
