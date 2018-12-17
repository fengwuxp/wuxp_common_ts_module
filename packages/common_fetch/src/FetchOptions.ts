import {BaseFetchOptions} from "./BaseFetchOptions";

/**
 * 请求配置
 */
export interface FetchOptions extends BaseFetchOptions {


    /**
     * 请求进度
     * @param data
     */
    requestProgress?: (data: {

        /**
         * 进度
         */
        progress: number;
        /**
         * 当前状态
         * state:’1’: 请求连接中
         * opened:’2’: 返回响应头中
         * received:’3’: 正在加载返回数据
         */
        readyState: number;
        /**
         * http 响应码
         */
        httpCode: number;

        /**
         * http 响应状态（响应码）描述
         */
        statusText?: string;

        /**
         * 响应头
         */
        headers: object;
    }) => void;

    /**
     * 环境上下文
     * 在发起请求是传入当前上下文，可以用于在filter中进行处理，
     * 仅对当前请求生效
     */
    context?: FetchContext;


    /**
     * 是否使用统一的提示
     * 默认：true
     */
    useUnifiedToast?: boolean;

    /**
     * 是否使用进度条,如果该值为false 则不会使用统一的提示
     * 默认：true
     */
    useProgressBar?: boolean;

    /**
     * 进度条配置
     * 进度条控制可以在拦截器实现
     *
     * @see {@link  /src/interceptor/default/NeedProgressBarInterceptor.ts}
     */
    progressBarOptions?: ProgressBarOptions;

}


export interface ProgressBarOptions {


    /**
     * 是否使用蒙版
     */
    mask?: boolean;

    /**
     * 提示的延迟时间，
     * 单位毫秒，默认：300
     */
    delay?: number;

    /**
     * 进度条提示标题
     */
    title?: string;

    /**
     * 进度条提示图标
     * 图标，字体图标名称或图片url
     */
    icon?: string;
}


/**
 * 请求响应
 */
export interface FetchResponse<T = any> {

    /**
     * http响应码(返回状态)
     */
    status: number;

    /**
     * 返回的状态描述
     */
    statusText?: string;

    /**
     * 请求是否成功
     */
    ok: boolean;


    /**
     * 响应数据
     */
    data: T;


    /**
     * http响应头
     */
    headers?: object;


}

/**
 * 一次请求的上下文
 */
export interface FetchContext<T = any> {

    // [key: string]: any


    /**
     * 响应的完整数据
     */
    resp: T
}
