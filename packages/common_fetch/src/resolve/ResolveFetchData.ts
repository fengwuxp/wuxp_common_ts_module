import {FetchResponse} from "../FetchOptions";

/**
 * 解析请求的结果数据
 */
export interface ResolveFetchData<T=any> {

    resolve: (data: T) => FetchResponse
}