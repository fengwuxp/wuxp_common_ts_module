import {FetchClientBuilder} from "./FetchClientBuilder";
import {HttpErrorHandler} from "../error/HttpErrorHandler";
import {FetchInterceptor} from "../interceptor/FetchInterceptor";
import {FetchClient} from "../fetch/FetchClient";
import {FetchAdapter} from "../adapter/FetchAdapter";
import FetchClientImpl from "../fetch/FetchClientImpl";
import CommonFetchEngine from "../engine/CommonFetchEngine";


/**
 * 简单的fetch client 构建器
 */
export default class SimpleFetchClientBuilder implements FetchClientBuilder {

    protected _httpErrorHandler: HttpErrorHandler;

    protected _interceptors: FetchInterceptor[];

    protected _adapter: FetchAdapter;

    adapter = (adapter: FetchAdapter): this => {
        this._adapter = adapter;
        return this;
    };


    httpErrorHandler = (httpErrorHandler: HttpErrorHandler): this => {
        this._httpErrorHandler = httpErrorHandler;
        return this;
    };

    interceptors = (interceptors: FetchInterceptor[] = []): this => {
        this._interceptors = interceptors;
        return this;
    };


    build = (): FetchClient => {
        const {_adapter, _interceptors, _httpErrorHandler} = this;
        return new FetchClientImpl(new CommonFetchEngine(_adapter), _interceptors, _httpErrorHandler);
    };

}