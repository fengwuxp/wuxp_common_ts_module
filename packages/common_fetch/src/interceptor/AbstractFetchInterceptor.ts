import {FetchInterceptor} from "./FetchInterceptor";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {BaseFetchOptions} from "../BaseFetchOptions";
import {HttpFetchException} from "../exception/HttpFetchException";

/**
 * 抽象的拦截器
 */
export default abstract class AbstractFetchInterceptor<T extends BaseFetchOptions = FetchOptions> implements FetchInterceptor<T> {


    preHandle = (params: T): Promise<T> | T | null | undefined => params;

    postHandle = (response: FetchResponse, options: T): FetchResponse | Promise<FetchResponse> | undefined | null => response;

    postHandleError = (exception: HttpFetchException | FetchResponse, options: T):
        HttpFetchException | FetchResponse | Promise<FetchResponse | HttpFetchException> | undefined | null => exception;


}
