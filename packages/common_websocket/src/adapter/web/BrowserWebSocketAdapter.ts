import {WebSocketOptions} from "../WebSocketAdapter";
import {WebSocketLifeCycleHandler} from "../../core/WebSocketLifeCycleHandler";
import AbstractWebSocketAdapter from "../AbstractWebSocketAdapter";


/**
 * 浏览器的web socket 适配器
 */
export default class BrowserWebSocketAdapter extends AbstractWebSocketAdapter<WebSocket> {

    constructor(options: WebSocketOptions, handler: WebSocketLifeCycleHandler) {
        super(new WebSocket(options.url, options.protocols), handler);
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onopen = this.onOpen;

        return this;
    }


}
