import {FetchContext, FetchOptions, FetchResponse} from "../FetchOptions";
import FetchInterceptorExecutor from "../interceptor/FetchInterceptorExecutor";
import {FetchClient} from "../fetch/FetchClient";
import {ReqequestMethod} from "../constant/ReqequestMethod";
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
    method?: ReqequestMethod;

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

const defaultTemplateConfig: RestTemplateConfig = {

    method: ReqequestMethod.POST,

    consumes: [MediaType.JSON],

    produces: [MediaType.JSON],

    timeout: 10 * 1000,

    headers: {}
};


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
     * 默认的骑过去呢客户端
     */
    protected fetchClient: FetchClient;


    /**
     * 拦截器执行器
     */
    protected interceptorExecutor: FetchInterceptorExecutor;


    constructor(templateConfig: RestTemplateConfig, routingStrategy: ApiRoutingStrategy, fetchClient: FetchClient, interceptorExecutor: FetchInterceptorExecutor) {
        this.templateConfig = {
            ...templateConfig,
            ...defaultTemplateConfig
        };
        this.routingStrategy = routingStrategy;
        this.fetchClient = fetchClient;
        this.interceptorExecutor = interceptorExecutor;
    }

    async fetch(options: FetchOptions): Promise<FetchResponse> {

        const interceptorExecutor = this.interceptorExecutor;

        //参数检查
        if (!options.method) {
            options.method = this.templateConfig.method;
        }

        if (!options.contentType) {
            options.contentType = this.templateConfig.consumes[0] || MediaType.JSON;
        }

        if (options.responseType == null) {
            //默认使用json
            //let mediaType = this.templateConfig.produces[0] || MediaType.JSON;
            options.responseType = ResponseType.JSON;
        }

        //路由
        //TODO 进制值复制处理
        options.url = this.routingStrategy.route(options.url);

        //TODO 进行重试的参数设置


        const transformRequest = options.transformRequest;
        if (transformRequest) {
            //执行 transformRequest
            options = transformRequest(options);
        }


        let fetchOptions, resp, response, fetchIsError;
        try {
            //执行前置拦截器
            fetchOptions = await interceptorExecutor.preHandle(options);
        } catch (e) {
            console.error("interceptor pre handle error", e);
        }

        //获取请求客户端
        const fetchClient = this.getFetchClient(options);

        try {
            //请求数据
            resp = await fetchClient.request(fetchOptions);
        } catch (e) {
            const {statusText, headers, data, status} = e;
            console.debug("请求异常", status, statusText);
            const exception: HttpFetchException = {
                name: HttpFetchExceptionName,
                message: statusText,
                httpCode: status,
                headers,
                response: data,
                request: options
            };
            //http code错误处理，将其广播
            ExceptionBroadcaster.broadcast(exception);
            //请求错误
            fetchIsError = true;
            resp = e;
        }
        try {
            //执行后置拦截器
            response = await interceptorExecutor.postHandle(resp, options);
        } catch (e) {
            console.error("interceptor post handle error", e);
            return e;
        }

        if (fetchIsError) {
            //请求错误
            return Promise.reject(resp)
        }

        //执行数据装换
        const transformResponse = options.transformResponse;

        if (transformResponse) {
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