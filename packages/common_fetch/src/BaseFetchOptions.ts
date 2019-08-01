import {RequestMethod} from "./constant/RequestMethod";
import {ResponseType} from "./constant/ResponseType";
import {FetchResponse} from "./FetchOptions";

/**
 * 基础Api options
 */
export interface BaseFetchOptions {

    /**
     * 请求url
     */
    url?: string;

    /**
     * 查询参数
     */
    queryPrams?: any;

    /**
     * 请求body，请求需要
     */
    data?: any;

    /**
     * 请求方法
     * 默认 POST
     */
    method?: RequestMethod;

    /**
     * 结果数据类型
     * 默认json
     */
    responseType?: ResponseType;

    /**
     * 请求头
     */
    headers?: HeadersInit;

    /**
     * 请求超时
     */
    timeout?: number;


    /**
     * content type
     * 默认值："application/x-www-form-urlencoded"
     * @see {@link ./constant/http/MediaType}
     */
    contentType?: string

    /**
     * 是否开启gzip压缩
     * 默认：false
     */
    enabledGzip: boolean;

    /**
     * 请求之前的执行的函数，在拦截器执行之前执行
     * @param options
     */
    transformRequest?<T extends BaseFetchOptions>(options: BaseFetchOptions): T;

    /**
     * 响应之后执行的函数 在拦截器执行之后执行
     * @param response
     */
    transformResponse?: (response: FetchResponse) => FetchResponse;
}
