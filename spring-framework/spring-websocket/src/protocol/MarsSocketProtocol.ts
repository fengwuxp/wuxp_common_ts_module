/**
 * 协议定义参考了 @link https://github.com/Tencent/mars
 */
export interface MarsSocketProtocol {

    /**
     * 命令id
     * 长连的cgi命令号，用于标识长连请求的cgi。相当于短连的 URI
     */
    commonId: number;

    /**
     * 序列号（消息id）
     * 是用来标识消息的唯一性的，长连上也通过比较 seq 的值来对应请求包和回包的关系。
     * 默认情况下0：表示是服务主动push下来的包
     */
    seq: number;

    /**
     * 客户端版本号
     * 在需要兼容多个版本时，用以区分
     */
    clientVersion: number;

    /**
     * 消息体
     */
    body: string | Blob | ArrayBuffer;
}

//@link https://github.com/Tencent/mars/wiki/Mars-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5%B1%95

//0：表示是服务主动push下来的包
const DEFAULT_PUSH_SEQ = 0;

//默认 ping pong的命令
const MARS_CMD_HEARTBEAT_VALUE = 6;

//信令
const MARS_CMD_SIGNALLING_VALUE = 243;