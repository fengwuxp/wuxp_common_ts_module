export interface WebSocketOptions {

    url: string,

    //子协议数组
    protocols?: string | string[],

    //HTTP Header , header 中不能设置 Referer
    header?: object
}

/**
 * web socket 适配器
 */
export interface WebSocketAdapter {

    // newInstance: (options: WebSocketOptions, handler: WebSocketLifeCycleHandler) => WebSocketAdapter;

    send: (data: any) => void;

    onOpen: (event: Event | any) => void;

    onClose: (event: CloseEvent|any) => void;

    close: (code?: number, reason?: string) => void;

    onMessage: (event: MessageEvent) => void;

    onError: (event: Event | any) => void;

}