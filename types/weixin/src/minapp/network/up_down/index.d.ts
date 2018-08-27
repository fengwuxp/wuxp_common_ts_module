/**
 * 上传下载文件
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html
 */


/**
 * 微信文件上传响应对象
 */
export interface UploadResp {

    /**
     * 开发者服务器返回的数据
     */
    data: string;

    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
}

/**
 * wx.uploadFile 文件上传请求对象
 */
export interface UploadReq {

    /**
     * 开发者服务器 url
     */
    url: string
    /**
     * 要上传文件资源的路径要上传文件资源的路径
     */
    filePath: string;

    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    name: string;

    /**
     * HTTP 请求 Header, header 中不能设置 Referer
     */
    header?: object;
    /**
     *HTTP 请求中其他额外的 form data
     */
    formData?: object;

    /**
     * 接口调用成功的回调函数
     * @param WeChatUploadResponse
     */
    success?: (repone: UploadResp) => void;

    /**
     * 否    接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;

}


/**
 * onProgressUpdate 返回参数说明：
 */
export interface OnProgressUpdateResp {
    /**
     * 上传进度百分比
     */
    readonly  progress: number;
    /**
     *    已经上传的数据长度，单位 Bytes
     */
    readonly  totalBytesSent: number;

    /**
     * 预期需要上传的数据总长度，单位 Bytes
     */
    readonly totalBytesExpectedToSend: number;
}

/**
 * wx.uploadFile 返回对象
 *
 */
export interface UploadTask {
    /**
     * 监听上传进度变化    1.4.0
     */
    readonly  onProgressUpdate: (callback: (p: OnProgressUpdateResp) => void) => void;

    /**
     * 中断上传任务    1.4.0
     */
    readonly   abort: () => void;
}


/**
 * 下载
 */

export interface DownloadFileReq {

    /**
     * 下载资源的 url
     */
    url: string
    /**
     *   HTTP 请求 Header，header 中不能设置 Referer
     */
    header?: object
    /**
     *      下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    success?: (reponse: DownloadResp) => void;
    /**
     *   接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;

}

export interface DownloadResp extends UploadResp {
}


/**
 * wx.downloadFile
 */
export interface DownloadTask {

    /**
     * 监听上传进度变化    1.4.0
     */
    readonly  onProgressUpdate: (callback: (p: OnProgressUpdateResp) => void) => void;

    /**
     * 中断上传任务    1.4.0
     */
    readonly   abort: () => void;
}
