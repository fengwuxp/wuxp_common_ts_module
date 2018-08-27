import {WebSocketOptions} from "../WebSocketAdapter";
import {WebSocketLifeCycleHandler} from "../../core/WebSocketLifeCycleHandler";
import {WeexWebSocketModule} from "weex/src/sdk/model/webSocket";
import AbstractWebSocketAdapter from "../AbstractWebSocketAdapter";

const webSocket: WeexWebSocketModule = weex.requireModule('webSocket');
/**
 * weex 的web socket 适配器
 */
export default class WeexWebSocketAdapter extends AbstractWebSocketAdapter<WebSocket> {


    private constructor(options: WebSocketOptions, handler: WebSocketLifeCycleHandler) {

        super(webSocket.WebSocket(options.url, options.protocols as string) as any, handler);
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onopen = this.onOpen;
        return this;
    }


}
