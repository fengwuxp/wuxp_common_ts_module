import {WeexModule} from "../../../../index";

/**
 * weex fetch
 * https://weex.apache.org/cn/references/modules/stream.html
 */
export interface WeexStreamModule extends WeexModule {

    /**
     * 请求数据方法
     * @param {WeexStreamOption} options
     * @param {(repone: WeexStreamResponse) => void} callback 请求回调
     * @param {(respone: WeexStreamProgressResponse) => void} progressCallback 进度回调
     */
    fetch: (options: WeexStreamOption,
            callback: (repone: WeexStreamResponse) => void,
            progressCallback?: (respone: WeexStreamProgressResponse) => void) => void;
}


export declare type WeexStreamOption = {

    /**
     * 请求url
     */
    url: string;


    /**
     * 请求方法
     * the HTTP method GET or POST
     */
    method?: string;

    /**
     * 结果数据类型
     * 响应类型，'json'，'text'或'jsonp'（与本地实现中的'json'相同）
     */
    type?: string;

    /**
     * 请求头
     */
    headers?: any;

    /**
     * 请求参数，请求需要
     */
    body?: string;

}

/**
 * 请求响应对象
 */
export interface WeexStreamResponse {

    /**
     * 返回的http状态码
     */
    readonly status: number;

    /**
     *是否成功
     * 如果状态码在 200~299 之间就为真
     */
    readonly ok: boolean;

    /**
     * 状态描述文本
     */
    readonly  statusText: string

    /**
     *  返回的数据，如果请求类型是 json 和 jsonp，则它就是一个 object ，如果不是，则它就是一个 string。
     */
    readonly  data: string | object

    /**
     * http响应头
     */
    readonly  headers: object;

    /**
     * 请求超时控制，毫秒数
     * 默认3 * 1000毫秒
     */
    timeout?: number;
}

/**
 * 请求进度响应对象
 */
export interface WeexStreamProgressResponse {

    /**
     * 当前状态state:’1’: 请求连接中opened:’2’: 返回响应头中received:’3’: 正在加载返回数据
     */
    readonly  readyState: number;
    /**
     * 响应状态码
     */
    readonly status: number;
    /**
     * 已经接受到的数据长度. 你可以从响应头中获取总长度
     */
    readonly  length: number;
    /**
     * 状态文本
     */
    readonly  statusText: string;
    /**
     * 响应头
     */
    readonly headers: object;
}
