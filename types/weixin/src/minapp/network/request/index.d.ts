/**
 * 网络请求
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html
 */

/**
 * wx.request 响应对象
 */
export interface FetchResp {
    readonly data?: object | string | ArrayBuffer;
    readonly header?: object;
    readonly statusCode: number;
}


/**
 * wx.request
 */
export interface RequestReq {
    /**
     * url
     */
    url: string;

    /**
     * 请求的参数
     */
    data?: object | string | ArrayBuffer;

    /**
     * 设置请求的 header，header 中不能设置 Referer。
     */
    header?: object;

    /**
     *    （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT,PATCH
     */
    method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | "PATCH" | "PATCH";

    /**
     * 如果设为json，会尝试对返回的数据做一次 JSON.parse
     */
    dataType?: string;

    /**
     * text    设置响应的数据类型。合法值：text、arraybuffer    1.7.0
     */
    responseType?: "text" | "arraybuffer"

    /**
     * 收到开发者服务成功返回的回调函数
     */
    success?: (response: FetchResp) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: (response: FetchResp) => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (response: FetchResp) => void;
}

/**
 * wx.request 返回值
 */
export interface RequestTask {

    /**
     * 中断请求任务
     */
    readonly abort: () => void;
}
