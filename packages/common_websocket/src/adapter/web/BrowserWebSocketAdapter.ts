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

        window.onbeforeunload = () => {
            if (this.socket) {
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
                this.socket.close();
            }
        };

        return this;
    }


}
