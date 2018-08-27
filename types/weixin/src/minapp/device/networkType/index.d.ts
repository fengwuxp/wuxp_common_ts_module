/**
 * 网络状态
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html
 */


/**
 * wx.getNetworkType
 */
export interface GetNetWorkTypeOptions {

    /**
     * 是    接口调用成功，返回网络类型 networkType
     */
    success: (result: NetWorkTypeResult) => void;
    /**
     *接口调用失败的回调函数
     */
    fail?: () => void;
    /**
     *=接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}

/**
 * 网络类型
 */
export enum NetWorkType {

    /**
     * wifi 网络
     */
    WIFI = "wifi",

    /**
     * 2g 网络
     */
    TWO_G = "2g",
    /**
     * 3g 网络
     * @type {string}
     */
    THREE_G = "3g",

    /**
     * 4g 网络
     */
    FOUR_G = "4g",
    /**
     * 无网络
     */
    NONE = "none",

    /**
     * Android下不常见的网络类型
     */
    UNKNOWN = "unknown"
}

export interface NetWorkTypeResult {
   readonly networkType: NetWorkType
}

/**
 * wx.onNetworkStatusChange 回调带回的参数
 */
export interface NetWorkChangeResult {
    /**
     * Boolean    当前是否有网络连接
     */
    readonly  isConnected: boolean;

    /**
     * String    网络类型
     */
    readonly networkType: NetWorkType
}
