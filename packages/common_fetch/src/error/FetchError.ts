/**
 * 请求失败的结果信息
 */
export interface FetchError {

    /**
     * 响应错误的描述消息
     */
    message: string;

    /**
     * http 响应码
     */
    httpCode: number;

    /**
     * 响应头
     */
    headers: any;
}