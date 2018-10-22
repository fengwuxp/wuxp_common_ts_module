import {WebSocketAdapter} from "../adapter/WebSocketAdapter";
import {WebSocketConnectionStatus} from "../enums/WebSocketConnectionStatus";

/**
 * webSocket实例 持有者
 */
export interface WebSocketHolder {


    /**
     * 连接
     * 返回Promise对象是为了在webSocket 连接断掉的情况下通过接口去恢复一下数据
     * @return Promise<WebSocketConnectionStatus>
     */
    connection: () => Promise<WebSocketConnectionStatus>;


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
