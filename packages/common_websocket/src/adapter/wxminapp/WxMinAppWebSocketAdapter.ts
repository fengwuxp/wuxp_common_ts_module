import {WebSocketOptions} from "../WebSocketAdapter";
import {WebSocketLifeCycleHandler} from "../../core/WebSocketLifeCycleHandler";
// @ts-ignore
import {ConnectSocketOptions} from "weixin/src/minapp/websocket/ConnectSocketOptions";
// @ts-ignore
import {WebSocketTask} from "weixin/src/minapp/websocket/WebSocketTask";
import AbstractWebSocketAdapter from "../AbstractWebSocketAdapter";

/**
 * 微信小程序 的web socket 适配器
 */
export default class WxMinAppWebSocketAdapter extends AbstractWebSocketAdapter<WebSocketTask> {


    constructor(options: WebSocketOptions, handler: WebSocketLifeCycleHandler) {
        // @ts-ignore
        super(wx.connectSocket(options as ConnectSocketOptions), handler);

        this.socket.onClose = (this.onClose);
        this.socket.onOpen = (this.onOpen);
        this.socket.onMessage = (this.onMessage);
        this.socket.onError = (this.onError);
    }

}
