import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "./FetchOptions";
import {HttpRequestEngine} from "../engine/HttpRequestEngine";
import {FetchInterceptor} from "../interceptor/FetchInterceptor";
import FetchInterceptorExecuter from "../interceptor/FetchInterceptorExecuter";
import {HttpFetchException} from "common_exception/src/http/HttpFetchException";
import ExceptionBroadcaster from "../../../common_exception/src/subscribe/ExceptionBroadcaster";
import {HttpFetchExceptionName} from "../../../common_exception/src/http/Const";

/**
 * fetch 客户端
 */
export default class FetchClientImpl implements FetchClient {

    /**
     * 请求引擎
     */
    private engine: HttpRequestEngine;

    /**
     * 拦截器执行器
     */
    private executor: FetchInterceptorExecuter;


    constructor(engine: HttpRequestEngine, interceptorList: FetchInterceptor[]) {
        this.engine = engine;
        this.executor = new FetchInterceptorExecuter(interceptorList);
    }

    fetch = (options: FetchOptions): Promise<FetchResponse> => {

        const executor = this.executor;
        const engine = this.engine;

        const transformRequest = options.transformRequest;
        if (transformRequest) {
            //执行 transformRequest
            options = transformRequest(options);
        }

        return executor.preHandle(options)
           /* .catch((error: Error) => {
                //TODO  将异常广播
                return error;
            })*/.then(engine.request)
            .then((resp) => {
                //后置拦截器
                return executor.postHandle(resp, options)
                    .then((response: FetchResponse) => {
                        const transformResponse = options.transformResponse;
                        if (transformResponse) {
                            //执行 transformResponse
                            response = transformResponse(response);
                        }
                        return response
                    })/*.catch((error) => {
                        //TODO  将异常广播
                        return error;
                    });*/

            }).catch((response: FetchResponse) => {
                const {message, headers, data, httpCode} = response;
                const exception: HttpFetchException = {
                    name: HttpFetchExceptionName,
                    message,
                    httpCode,
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
