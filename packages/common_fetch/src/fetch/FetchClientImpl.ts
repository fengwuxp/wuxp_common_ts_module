import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "./FetchOptions";
import {HttpRequestEngine} from "../engine/HttpRequestEngine";
import {FetchInterceptor} from "../interceptor/FetchInterceptor";
import FetchInterceptorExecuter from "../interceptor/FetchInterceptorExecuter";
import {HttpErrorHandler} from "../error/HttpErrorHandler";
import FetchHttpErrorHandler from "../error/FetchHttpErrorHandler";

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
    private httpErrorHandler: HttpErrorHandler;


    constructor(engine: HttpRequestEngine, interceptorList: FetchInterceptor[], httpErrorHandler: HttpErrorHandler) {
        this.engine = engine;
        this.executor = new FetchInterceptorExecuter(interceptorList);
        this.httpErrorHandler = httpErrorHandler || new FetchHttpErrorHandler();
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
            .catch((error: Error) => {
                //分发错误
                return error;
            }).then(engine.request)
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
                    }).catch((error) => {
                        //TODO　分发错误
                        return error;
                    });

            }).catch((resp) => {
                //http code错误处理
                this.httpErrorHandler.handleRequestError(resp, options);

                return resp;
            });
    };


}
