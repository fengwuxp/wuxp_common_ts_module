import {ReqMethod} from "../../constant/ReqMethod";
import {FetchOptions} from "../../fetch/FetchOptions";

export interface RequestMappingOptions {

    /**
     * 请求的uri地址
     */
    value?: string;


    /**
     * 请求头
     */
    headers?: object;

    /**
     * 超时时间，
     * 单位：毫秒
     * 默认 10*1000 毫秒
     */
    timeout?: number;

    /**
     * 请求 method
     */
    method?: ReqMethod;

    /**
     * 提交的数据类型
     * @see {@link ../constant/http/MediaType}
     * 默认 MediaType.JSON
     */
    consumes?: string[];

    /**
     * 响应的数据类型
     * @see {@link ../constant/http/MediaType}
     */
    produces?: string[];

}
