/**
 * http media type
 */
export enum HttpMediaType {


    /**
     * 表单
     */
    FORM_DATA = "application/x-www-form-urlencoded",

    /**
     * 文件上传
     */
    MULTIPART_FORM_DATA = "multipart/form-data",

    /**
     * json
     */
    APPLICATION_JSON = "application/json",

    /**
     * JSON_UTF_8
     */
    APPLICATION_JSON_UTF8 = "application/json;charset=UTF-8",

    TEXT = "text/plain",

    HTML = "text/html",

    /**
     * 流
     */
    APPLICATION_STREAM = "application/octet-stream"




    // /**
    //  * json
    //  */
    // JSON = "application/json",
    //
    // /**
    //  * JSON_UTF_8
    //  */
    // JSON_UTF8 = "application/json;charset=UTF-8",


}
