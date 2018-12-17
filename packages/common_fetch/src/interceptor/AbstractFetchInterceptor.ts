import {FetchInterceptor} from "./FetchInterceptor";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {BaseFetchOptions} from "../BaseFetchOptions";

/**
 * 抽象的拦截器
 */
export default abstract class AbstractFetchInterceptor<T extends BaseFetchOptions = FetchOptions> implements FetchInterceptor<T> {


    preHandle = (params: T): Promise<T> | T | null | undefined => params;

    postHandle = (response: FetchResponse, options: T): FetchResponse | Promise<FetchResponse> | undefined | null => response

    postHandleError = <R>(response: R, options: T): R | undefined | null => response


}