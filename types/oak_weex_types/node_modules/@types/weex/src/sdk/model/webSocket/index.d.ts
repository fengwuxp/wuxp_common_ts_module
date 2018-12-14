import {WeexModule} from "../../../../index";

/**
 * weex webstocket
 * https://weex.apache.org/cn/references/modules/websocket.html
 */
export interface WeexWebSocketModule extends WeexModule {

    /**
     * 创建 WebSockets，并连接服务器
     * @param {string} url
     * @param {string} protocol
     * @constructor
     */
    readonly  WebSocket: (url: string, protocol: string) => void;

    /**
     * 通过WebSocket连接向服务器发送数据
     * @param {string} data
     */
    readonly  send: (data: string) => void;

    /**
     * 关闭 WebSockets 的链接
     * @param {number} code : 关闭连接的状态号.
     * @param {string} reason 关闭的原因
     */
    readonly close: (code: number, reason: string) => void;

    /**
     * 链接打开的监听
     * @param {object} options
     */
    onopen: (options: object) => void;

    /**
     *消息事件的监听器
     * @param {WeexWebSocketMessage} options  服务器返回的消息对象
     */
    onmessage: (options: WeexWebSocketMessage) => void;

    /**
     * 关闭事件的监听器
     * @param {WeexWebSocketCloseMessge} options  监听器接收到的对象
     */
    onclose: (options: WeexWebSocketCloseMessge) => void;

    /**
     * 错误事件的监听器
     * @param {WeexWebSocketMessage} options 错误信息的事件
     */
    onerror: (options: WeexWebSocketMessage) => void;
}


export interface WeexWebSocketMessage {
    /**
     * 监听器接收的到的消息
     */
    readonly data: string
}

export interface WeexWebSocketCloseMessge {
    /**
     * 服务器返回关闭的状态码
     */
    readonly code: number;
    /**
     * 服务器返回的关闭原因
     */
    readonly reason: string;
    /**
     * 是否完全关闭
     */
    readonly wasClean: string;
}
