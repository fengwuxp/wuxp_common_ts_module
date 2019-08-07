import {FetchOptions, FetchResponse} from "../FetchOptions";
import FetchInterceptorExecutor from "../interceptor/FetchInterceptorExecutor";
import {FetchClient} from "../fetch/FetchClient";
import {RequestMethod} from "../constant/RequestMethod";
import {ApiRoutingStrategy} from "../route/ApiRoutingStrategy";
import {HttpFetchException} from "../exception/HttpFetchException";
import {HttpFetchExceptionName} from "../exception/Const";
import ExceptionBroadcaster from "../exception/ExceptionBroadcaster";
import {ResponseType} from "../constant/ResponseType";
import {MediaType} from "../constant/http/MediaType";
import {RetryOptions} from "../FetchRetryOptions";


/**
 * rest template
 *
 * 接口请求模板，固化请求的一些行为和配置
 * <pre>
 *    1. 固化请求的入口地址（路由策略） @模块名/接口地址 => http://域名/webContext/接口地址
 *    2. 固化拦截器和统一错误处理
 *
 *
 * <pre>
 */
export interface RestTemplate {

    fetch: (options: FetchOptions) => Promise<FetchResponse>;
}

/**
 * rest template 配置
 */
export interface RestTemplateConfig extends RetryOptions {

    /**
     * 默认要带上的请求头
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
    method?: RequestMethod;

    /**
     * 响应的数据类型
     * @see {@link ../constant/http/MediaType}
     * 默认 MediaType.JSON_UTF8
     */
    consumes?: string[];

    /**
     * 提交的数据类型
     * @see {@link ../constant/http/MediaType}
     */
    produces?: string[];

    /**
     * 默认的fetch options
     */
    defaultFetchOptions?: FetchOptions;
}

const defaultTemplateConfig: RestTemplateConfig = {

    method: RequestMethod.POST,

    consumes: [MediaType.JSON_UTF8],

    produces: [MediaType.JSON_UTF8],

    timeout: 10 * 1000,

    headers: {
        'Accept': 'application/json, application/json;charset=UTF-8, text/plain, */*'
    },
    defaultFetchOptions: {} as FetchOptions
};

//响应类型的映射关系
const RESPONSE_MAP: Map<string, ResponseType> = new Map<string, ResponseType>();
RESPONSE_MAP.set(MediaType.JSON_UTF8, ResponseType.JSON);
RESPONSE_MAP.set(MediaType.TEXT, ResponseType.TEXT);
RESPONSE_MAP.set(MediaType.HTML, ResponseType.HTML);


/**
 * 抽象的 rest template实现
 */
export abstract class AbstractRestTemplate implements RestTemplate {

    /**
     * 模板配置
     */
    protected templateConfig: RestTemplateConfig;

    /**
     * 路由策略
     */
    protected routingStrategy: ApiRoutingStrategy;


    /**
     * 默认的请求客户端
     */
    protected fetchClient: FetchClient;


    /**
     * 拦截器执行器
     */
    protected interceptorExecutor: FetchInterceptorExecutor;


    constructor(templateConfig: RestTemplateConfig,
                routingStrategy: ApiRoutingStrategy,
                fetchClient: FetchClient,
                interceptorExecutor: FetchInterceptorExecutor) {
        this.templateConfig = {
            ...defaultTemplateConfig,
            ...templateConfig
        };
        this.routingStrategy = routingStrategy;
        this.fetchClient = fetchClient;
        this.interceptorExecutor = interceptorExecutor;
    }

    async fetch(options: FetchOptions): Promise<FetchResponse> {

        const interceptorExecutor = this.interceptorExecutor;
        //TODO 进行重试的参数设置

        let newOptions = {
            ...this.templateConfig.defaultFetchOptions,
            ...options
        };

        //参数检查
        if (!newOptions.method) {
            newOptions.method = this.templateConfig.method;
        }

        if (!newOptions.contentType) {
            //请求提交的数据类型
            newOptions.contentType = this.templateConfig.produces[0] || MediaType.JSON_UTF8;
        }

        if (newOptions.timeout == null) {
            //请求提交的数据类型
            newOptions.timeout = this.templateConfig.timeout;
        }

        if (newOptions.responseType == null) {
            //默认使用json
            newOptions.responseType = RESPONSE_MAP[this.templateConfig.consumes[0] || MediaType.JSON_UTF8] || ResponseType.JSON;
        }

        //路由
        //TODO 进制值复制处理
        newOptions.url = this.routingStrategy.route(newOptions.url);


        const transformRequest = newOptions.transformRequest;
        if (transformRequest) {
            //执行 transformRequest
            newOptions = transformRequest(newOptions);
        }


        let fetchOptions, resp, response, fetchIsError;
        try {
            //执行前置拦截器
            fetchOptions = await interceptorExecutor.preHandle(newOptions);
        } catch (e) {
            //忽略前置拦截器的执行异常
            console.error("interceptor pre handle error", e);
        }

        //获取请求客户端
        const fetchClient = this.getFetchClient(fetchOptions);

        try {
            //请求数据
            resp = await fetchClient.request(fetchOptions);
        } catch (e) {
            const {statusText, headers, status} = e;
            console.debug("请求异常", status, statusText);
            const exception: HttpFetchException = {
                name: HttpFetchExceptionName,
                message: statusText,
                httpCode: status,
                headers,
                response: e,
                request: options
            };
            //http code错误处理，将其广播
            ExceptionBroadcaster.broadcast(exception);
            //请求错误
            fetchIsError = true;
            resp = exception;
            // return Promise.reject(exception);
        }

        try {
            //执行拦截器后置处理
            //如果有发生异常，拦截其中需要处理，并根据自己的逻辑对相应作出装换，决定请求最终是成功还是失败
            response = await interceptorExecutor.postHandle(resp, options, fetchIsError);
        } catch (e) {
            //明确是reject
            return Promise.reject(e);
        }

        //执行数据转化
        const transformResponse = options.transformResponse;

        if (typeof transformResponse === "function") {
            //执行 transformResponse
            response = transformResponse(response);
        }

        return response;

        // return interceptorExecutor.preHandle(options)
        //     .then(fetchClient.request)
        //     .then((resp) => {
        //         //后置拦截器
        //         return interceptorExecutor.postHandle(resp, options)
        //             .then((response: FetchResponse) => {
        //                 const transformResponse = options.transformResponse;
        //                 if (transformResponse) {
        //                     //执行 transformResponse
        //                     response = transformResponse(response);
        //                 }
        //                 return response
        //             });
        //     }).catch((response: FetchResponse) => {
        //         const {statusText, headers, data, status} = response;
        //         console.debug("请求异常", status, statusText);
        //         const exception: HttpFetchException = {
        //             name: HttpFetchExceptionName,
        //             message: statusText,
        //             httpCode: status,
        //             headers,
        //             response: data,
        //             request: options
        //         };
        //         //http code错误处理，将其广播
        //         ExceptionBroadcaster.broadcast(exception);
        //         return Promise.reject(response);
        //     });
    };

    /**
     * 获取请求的客户端工具
     */
    protected abstract getFetchClient: (options: FetchOptions) => FetchClient;

}