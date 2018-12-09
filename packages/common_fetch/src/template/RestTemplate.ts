import {FetchOptions, FetchResponse} from "../FetchOptions";
import FetchInterceptorExecutor from "../interceptor/FetchInterceptorExecutor";
import {FetchClient} from "../fetch/FetchClient";
import {HttpFetchException} from "common_exception/src/http/HttpFetchException";
import {HttpFetchExceptionName} from "common_exception/src/http/Const";
import ExceptionBroadcaster from "common_exception/src/subscribe/ExceptionBroadcaster";
import {ReqMethod} from "../constant/ReqMethod";
import {ApiRoutingStrategy} from "../route/ApiRoutingStrategy";


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
export interface RestTemplateConfig {

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
     * 请求客户端工具
     */
    protected fetchClient: FetchClient;

    /**
     * 拦截器执行器
     */
    protected interceptorExecutor: FetchInterceptorExecutor;


    constructor(templateConfig: RestTemplateConfig, routingStrategy: ApiRoutingStrategy, fetchClient: FetchClient, interceptorExecutor: FetchInterceptorExecutor) {
        this.templateConfig = templateConfig;
        this.routingStrategy = routingStrategy;
        this.fetchClient = fetchClient;
        this.interceptorExecutor = interceptorExecutor;
    }

    fetch = (options: FetchOptions): Promise<FetchResponse> => {

        const interceptorExecutor = this.interceptorExecutor;
        const fetchClient = this.fetchClient;

        const transformRequest = options.transformRequest;
        if (transformRequest) {
            //执行 transformRequest
            options = transformRequest(options);
        }
        return interceptorExecutor.preHandle(options)
        /* .catch((error: Error) => {
             //TODO  将异常广播
             return error;
         })*/.then(fetchClient.request)
            .then((resp) => {
                //后置拦截器
                return interceptorExecutor.postHandle(resp, options)
                    .then((response: FetchResponse) => {
                        const transformResponse = options.transformResponse;
                        if (transformResponse) {
                            //执行 transformResponse
                            response = transformResponse(response);
                        }
                        return response
                    })
                /*.catch((error) => {
                                        //TODO  将异常广播
                                        return error;
                                    });*/

            })
            .catch((response: FetchResponse) => {
                const {statusText, headers, data, status} = response;
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
                return response;
            });
    };


}