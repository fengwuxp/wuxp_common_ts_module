import {FetchInterceptor} from "./FetchInterceptor";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {BaseFetchOptions} from "../BaseFetchOptions";

/**
 * 抽象的拦截器
 */
export default abstract class AbstractFetchInterceptor<T extends BaseFetchOptions = FetchOptions> implements FetchInterceptor<T> {


    postHandle(data: FetchResponse, options: T): FetchResponse | Promise<FetchResponse> | null | undefined {
        return data;
    }

    preExecutionCondition = (params: T) => params != null;


    preHandle(params: T): Promise<T> | T | null | undefined {
        return params;
    }


    postExecutionCondition = (data: FetchResponse, options: T) => data != null;


}