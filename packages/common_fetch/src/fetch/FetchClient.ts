import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchOptions, FetchResponse} from "../FetchOptions";

/**
 * 用于http 请求的引擎
 */
export interface FetchClient<T extends FetchOptions = FetchOptions> extends FetchAdapter<T> {

    /**
     * get 请求
     * @param options
     */
    get: (options: T) => Promise<FetchResponse>;

    /**
     * post 请求
     * @param options
     */
    post: (options: T) => Promise<FetchResponse>;

    /**
     * put 请求
     * @param options
     */
    put: (options: T) => Promise<FetchResponse>;

    /**
     * delete 请求
     * @param options
     */
    delete: (options: T) => Promise<FetchResponse>;
}