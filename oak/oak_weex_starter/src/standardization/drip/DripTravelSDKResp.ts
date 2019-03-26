/**
 * 滴滴app sdk统一响应
 */
export interface DripTravelSDKResp<T> {

    /**
     * 错误码。0表示请求成功，可以处理返回数据
     */
    errno: number;

    /**
     * 错误原因。正确返回时为空，否则为错误原因
     */
    errmsg: string;


    /**
     * 数据
     */
    data: T;
}