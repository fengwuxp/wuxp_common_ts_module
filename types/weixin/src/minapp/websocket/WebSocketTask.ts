import {WebSocketSendMessage, WebSocketMessageResponse, WebSocketCloseMessage} from "./WebSocketSendMessage";

/**
 * https://developers.weixin.qq.com/miniprogram/dev/api/socket-task.html
 * SocketTask
 * 基础库 1.7.0 开始支持，低版本需做兼容处理WebSocket 任务，
 * 可通过 wx.connectSocket() 接口创建返回。
 */
export interface WebSocketTask {

    /**
     * 通过 WebSocket 连接发送数据。
     * @param options
     */
    send: (options: WebSocketSendMessage) => void;

    /**
     * 关闭 WebSocket 连接。
     * @param options
     */
    close:(options:WebSocketCloseMessage)=>void;

    /**
     * 监听 WebSocket 连接打开事件。
     * @param callback
     */
    onOpen: (callback: (res?: { header: object }) => void) => void;

    /**
     * 监听 WebSocket 连接关闭事件。
     * @param callback
     */
    onClose: (callback: (res:any) => void) => void;

    /**
     * 监听 WebSocket 错误。
     * @param callback
     */
    onError: (callback: (errMsg: string) => void) => void;

    /**
     * 监听WebSocket接受到服务器的消息事件。
     * @param callback
     */
    onMessage: (callback: (data:WebSocketMessageResponse) => void) => void
}

