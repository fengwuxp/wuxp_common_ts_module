/**
 * web socket连接配置
 */
export interface ConnectSocketOptions {

    /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     */
    url: string;

    /**
     * 子协议数组
     */
    protocols?: string[];

    /**
     * HTTP Header , header 中不能设置 Referer
     */
    header?: object;


    /**
     * 接口调用成功的回调函数
     */
    success?: () => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}