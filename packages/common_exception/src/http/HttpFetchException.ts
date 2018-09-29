import {Exception} from "../Exception";


/**
 * http fetch exception
 * @author wxup
 * @create 2018-09-29 17:28
 **/
export interface HttpFetchException extends Exception {

    /**
     * http 响应码
     */
    httpCode: number;

    /**
     * 响应头
     */
    headers: any;

    /**
     * 响应数据
     */
    response: any;

    /**
     * 请求数据
     */
    request: any;
}
