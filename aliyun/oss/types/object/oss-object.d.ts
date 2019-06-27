import ReadStream = NodeJS.ReadStream;

/**
 * oss 对象操作
 */
export interface OssObject {

    /**
     * @docs https://github.com/ali-sdk/ali-oss#appendname-file-options
     *
     * Append an object to the bucket, it's almost same as put, but it can add content to existing object rather than override it.
     * All parameters are same as put except for options.position
     *
     * 将对象附加到存储桶，它与put几乎相同，但它可以向现有对象添加内容而不是覆盖它。除options.position外，所有参数与put相同
     * @param name
     * @param file
     * @param options
     */
    append: (name: string, file: string | Buffer | ReadStream, options: AppendOptions) => Promise<{

        // name {String} object name
        readonly name: string;

        // url {String} the url of oss
        readonly url: string;

        // res {Object} response info, including
        readonly  res: CommonResResponse;

        // nextAppendPosition {String} the next position
        readonly  nextAppendPosition: string;

    }>;

    /**
     * @docs  https://github.com/ali-sdk/ali-oss#multipartuploadname-file-options
     * @link https://help.aliyun.com/document_detail/31992.html
     *
     * 使用OSS multipart上传文件。
     * 此函数包含initMultipartUpload，uploadPart，completeMultipartUpload。
     * 使用multipartUpload api时，如果遇到ConnectionTimeoutError问题，
     * 则应在业务代码中处理ConnectionTimeoutError。 如何解决ConnectionTimeoutError，
     * 您可以减少partSize大小，增加超时，重试请求或提供业务代码的提示;
     *
     * @param name {String} object name
     * @param file {String|File(only support Browser)|Blob(only support Browser)} file path or HTML5 Web File or web Blob
     * @param options
     */
    multipartUpload: (name: string, file: string | File, options: MultipartOptions) => Promise<MultipartUploadResp>;


}

export type ExtraHeaders = {

    "Cache-Control"?: string;

    "Cache-Disposition"?: string;

    "Cache-Encoding"?: string;

    "Expires"?: number;

    [extraProp: string]: string | number;
};

export type CommonResResponse = {

    // {Number} response status
    status: number;

    // {Object} response headers
    headers: object;

    //size {Number} response size
    size: number;

    //request total use time (ms)
    //毫秒数
    rt: number;


    //上传的url结果列表
    requestUrls: string[]
};


export interface AppendOptions {

    // [position] {String} specify the position which is the content length of the latest object
    position?: string;

    //[timeout] {Number} the operation timeout
    timeout?: number;

    //[meta] {Object} user meta, will send with x-oss-meta- prefix string e.g.: { uid: 123, pid: 110 }
    meta?: {
        [key: string]: string
    };

    //{String} custom mime , will send with Content-Type entity header
    mime?: MimeType;

    headers?: ExtraHeaders;
}


export type Checkpoint = {
    //用户选择的文件对象，如果重新启动浏览器，则需要用户手动触发设置
    file: File;

    //object key
    name: string;

    //文件大小
    fileSize: number;

    //分片大小
    partSize: number;

    //上传id
    uploadId: string;

    //{Array} An array of pieces that have been completed, including the object structure as follows
    //已完成的片段数组，包括如下对象结构
    doneParts: Array<{
        //{Number} part number
        number: number;
        //{String} part etag
        etag: string;
    }>
};


export interface MultipartOptions {
    // [parallel] {Number} the number of parts to be uploaded in parallel
    //要并行上传的分片数量
    parallel?: number;

    //[partSize] {Number} the suggested size for each part
    //每个分片的大小
    partSize?: number;

    //{Function} function | async | Promise, the progress callback called after each successful upload of one part,
    // it will be given three parameters: (percentage {Number}, checkpoint {Object}, res {Object})
    /**
     *
     * @param percentage
     * @param checkpoint
     * @param res
     */
    progress?: (
        percentage: number,
        checkpoint: Checkpoint,
        res: CommonResResponse) => Promise<any> | void;

    //the checkpoint to resume upload, if this is provided, it will continue the upload from where interrupted, otherwise a new multipart upload will be created.
    //恢复上传的检查点，如果提供，它将从中断的地方继续上传，否则将创建新的分段上传。
    checkpoint?: Checkpoint;

    //user meta，将使用x-oss-meta-前缀字符串发送
    meta?: {
        [key: string]: string
    };

    //{String} custom mime , will send with Content-Type entity header
    mime?: MimeType;

    //https://www.alibabacloud.com/help/zh/doc-detail/31989.htm
    //The callback parameter is composed of a JSON string encoded in Base64,detail
    callback?: {
        // url {String} After a file is uploaded successfully, the OSS sends a callback request to this URL.
        url: string;

        // [host] {String} The host header value for initiating callback requests.
        host?: string;

        // body {String} The value of the request body when a callback is initiated, for example, key=$(key)&etag=$(etag)&my_var=$(x:my_var).
        body: string;

        // [contentType] {String} The Content-Type of the callback requests initiatiated, It supports application/x-www-form-urlencoded and application/json, and the former is the default value.
        contentType: string;

        // [customValue] {Object} Custom parameters are a map of key-values
        // var customValue = {var1: 'value1', var2: 'value2'}
        customValue?: {
            [key: string]: any
        }
    };

    // @link http://www.w3.org/Protocols/rfc2616/rfc2616.html
    // extra headers, detail see RFC 2616
    // 'Cache-Control' cache control for download, e.g.: Cache-Control: public, no-cache
    // 'Content-Disposition' object name for download, e.g.: Content-Disposition: somename
    // 'Content-Encoding' object content encoding for download, e.g.: Content-Encoding: gzip
    // 'Expires' expires time (milliseconds) for download, e.g.: Expires: 3600000
    // NOTE: Some headers are disabled in browser
    headers?: ExtraHeaders;

    //[timeout] {Number} Milliseconds before a request is considered to be timed out
    //毫秒数
    timeout?: number;
}


export interface MultipartUploadResp {

    readonly res: CommonResResponse,

    // {String} bucket name
    readonly bucket: string;

    //name {String} object name store on OSS
    readonly  name: string;

    // {String} object etag contains ", e.g.: "5B3C1A2E053D763E1B002CC607C5A0FE"
    readonly etag: string;

    // {Object} callback server response data, sdk use JSON.parse() return
    readonly data: string;

}