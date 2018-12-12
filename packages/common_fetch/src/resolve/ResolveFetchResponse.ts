import {FetchResponse} from "../FetchOptions";

/**
 * 解析请求的结果数据
 */
export interface ResolveFetchResponse<T=any> {

    resolve: (data: T) => FetchResponse
}