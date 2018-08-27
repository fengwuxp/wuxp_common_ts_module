

/**
 * web socket 生命周期参数
 */
export interface WebSocketLifeCycleHandler {




    /**
     * 打开被连接
     * @param {Event} event
     */
    onOpen: (event: Event | any) => void;


    /**
     * 连接被关闭
     * @param {CloseEvent} event
     
     */
    onClose: (event: CloseEvent | any) => void;


    /**
     * 发生错误
     * @param {Event} event
     
     */
    onError: (event: Event | any) => void;

    /**
     * 接受到消息
     * @param {MessageEvent} event
     
     */
    onMessage: (event: MessageEvent | any) => void;




}
