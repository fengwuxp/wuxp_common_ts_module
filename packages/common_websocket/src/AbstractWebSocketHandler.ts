import {WebSocketLifeCycleHandler} from "./core/WebSocketLifeCycleHandler";
import {WebSocketAdapter, WebSocketOptions} from "./adapter/WebSocketAdapter";
import {WebSocketMessageRouter} from "./core/WebSocketMessageRouter";
import WebSocketFactory from "./factory/WebSocketFactory";
import {isNullOrUndefined} from "util";
import {WebSocketHolder} from "./core/WebSocketHolder";
import {WebSocketConnectionStatus} from "./enums/WebSocketConnectionStatus";

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
    protected connectionStatus: WebSocketConnectionStatus = WebSocketConnectionStatus.NONE;


    constructor(messageRouter: WebSocketMessageRouter, options?: WebSocketOptions,) {
        this.messageRouter = messageRouter;
        this.webSocketOptions = {...options};
    }

    onClose = (event: CloseEvent) => {
        //标记 webSocket 连接状态
        this.connectionStatus = WebSocketConnectionStatus.CLOSE;
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
        this.connectionStatus = WebSocketConnectionStatus.CLOSE;
    };


    connection = (options?: WebSocketOptions): Promise<WebSocketConnectionStatus> => {

        if (this.allowReconnect===false || this.connectionStatus === WebSocketConnectionStatus.WAITING) {
            console.log("连接等待中或不允许该持有者再次连接webSocket");
            return Promise.reject(this.connectionStatus);
        }
        if (this.connectionStatus === WebSocketConnectionStatus.CONNECTING ||
            this.connectionStatus === WebSocketConnectionStatus.RECONNECT) {
            //将连接状态置为已经连接
            this.connectionStatus = WebSocketConnectionStatus.CONNECTING;
            return Promise.resolve(this.connectionStatus);
        }

        if (options != null) {
            this.webSocketOptions = options;
        }
        const oldStatus = this.connectionStatus;
        this.connectionStatus = WebSocketConnectionStatus.WAITING;
        //连接webSocket
        this.webSocket = WebSocketFactory.factory(this.webSocketOptions, this);
        if (oldStatus === WebSocketConnectionStatus.NONE) {
            //首次连接
            this.connectionStatus = WebSocketConnectionStatus.CONNECTING;
        } else {
            //发生了重新连接
            this.connectionStatus = WebSocketConnectionStatus.RECONNECT;
        }
        return Promise.resolve(this.connectionStatus);
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
