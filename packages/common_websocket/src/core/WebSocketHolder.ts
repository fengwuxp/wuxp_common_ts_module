import {WebSocketAdapter, WebSocketOptions} from "../adapter/WebSocketAdapter";

/**
 * webSocket实例 持有者
 */
export interface WebSocketHolder {


    /**
     * 连接
     * @param options
     */
    connection: (options?: WebSocketOptions) => void;


    /**
     * 是否允许重连
     * @param code
     * @param reason
     * @param allowReconnect
     */
    close: (code?: number, reason?: string,allowReconnect?: boolean) => void;

    /**
     * 获取当前的webSocket
     */
    getWebSocket: () => WebSocketAdapter;
}