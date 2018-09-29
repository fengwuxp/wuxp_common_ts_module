import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "./FetchOptions";
import {HttpRequestEngine} from "../engine/HttpRequestEngine";
import {FetchInterceptor} from "../interceptor/FetchInterceptor";
import FetchInterceptorExecuter from "../interceptor/FetchInterceptorExecuter";
import HttpFetchExceptionHandler from "common_exception/src/http/HttpFetchExceptionHandler";
import {HttpFetchException} from "common_exception/src/http/HttpFetchException";

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

    /**
     * http 请求出错时的错误处理者
     */
    private httpExceptionHandler: HttpFetchExceptionHandler;


    constructor(engine: HttpRequestEngine, interceptorList: FetchInterceptor[], httpExceptionHandler: HttpFetchExceptionHandler) {
        this.engine = engine;
        this.executor = new FetchInterceptorExecuter(interceptorList);
        this.httpExceptionHandler = httpExceptionHandler || new HttpFetchExceptionHandler();
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

                //TODO 改为广播模式

                const {message, headers, data, httpCode} = response;
                const exception: HttpFetchException = {
                    name: "HttpFetchException",
                    message,
                    httpCode,
                    headers,
                    response: data,
                    request: options
                };
                //http code错误处理
                this.httpExceptionHandler.handle(exception);

                return response;
            });
    };


}
