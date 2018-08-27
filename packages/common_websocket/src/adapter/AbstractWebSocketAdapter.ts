import {WebSocketAdapter} from "./WebSocketAdapter";
import {WebSocketLifeCycleHandler} from "../core/WebSocketLifeCycleHandler";


export default abstract class AbstractWebSocketAdapter<T extends WebSocket> implements WebSocketAdapter {

    protected socket: T;

    protected handler: WebSocketLifeCycleHandler;


    constructor(socket: T, handler: WebSocketLifeCycleHandler) {
        this.socket = socket;
        this.handler = handler;
    }

    // abstract newInstance: (options: WebSocketOptions, handler: WebSocketLifeCycleHandler) => WebSocketAdapter;


    send = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
        this.socket.send(data);
    };


    close = (code?: number, reason?: string) => {
        this.socket.close(code, reason);
    };

    onClose = (event: CloseEvent) => {
        this.handler.onClose(event, this);
    };

    onError = (event: (Event | any)) => {
        this.handler.onError(event, this);
    };

    onMessage = (event: MessageEvent) => {
        this.handler.onMessage(event, this);
    };

    onOpen = (event: (Event | any)) => {
        this.handler.onOpen(event, this);
    };
}