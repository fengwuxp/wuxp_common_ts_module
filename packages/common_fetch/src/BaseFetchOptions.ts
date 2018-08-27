import {ReqMethod} from "./enums/ReqMethod";
import {DataType} from "./enums/DataType";
import {SerializeType} from "./enums/http/SerializeType";
import {FetchResponse} from "./fetch/FetchOptions";

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
     */
    method?: ReqMethod;

    /**
     * 结果数据类型
     */
    dataType?: DataType;

    /**
     * 请求头
     */
    headers?: object;


    /**
     * 提交的数据序列化处理
     * none:不做任何处理
     * defaultState：以表单的方式处理
     * 默认值：defaultState
     */
    serializeType?: SerializeType


    /**
     * 请求之前的执行的函数，在拦截器执行之钱执行
     * @param options
     */
    transformRequest<T extends BaseFetchOptions>(options: BaseFetchOptions): T;

    /**
     * 响应之后执行的函数 在拦截器执行之后执行
     * @param response
     */
    transformResponse?: (response: FetchResponse) => FetchResponse;
}
