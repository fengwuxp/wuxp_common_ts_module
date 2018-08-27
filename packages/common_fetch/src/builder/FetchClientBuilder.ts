import {FetchClient} from "../fetch/FetchClient";
import {FetchInterceptor} from "../interceptor/FetchInterceptor";
import {HttpErrorHandler} from "../error/HttpErrorHandler";
import {FetchAdapter} from "../adapter/FetchAdapter";

/**
 * fetch client builder
 */
export interface FetchClientBuilder {


    adapter: (adapter: FetchAdapter) => this;

    interceptors: (interceptors?: FetchInterceptor[]) => this;

    httpErrorHandler: (httpErrorHandler?: HttpErrorHandler) => this;

    build: () => FetchClient;
}