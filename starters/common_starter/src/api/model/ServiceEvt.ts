/**
 * api请求对象基类
 */
export interface ServiceEvt {

    /**
     * 接入账号
     */
    clientId?: string;

    /**
     * 签名信息
     */
    sign?: string;

    /**
     * 签名时间戳
     */
    timestamp?: string;

    /**
     * 渠道编号
     * @type {string}
     */
    channelCode?: string;


}
