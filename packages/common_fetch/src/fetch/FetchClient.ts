import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchOptions, FetchResponse} from "../FetchOptions";

/**
 * 用于http 请求的引擎
 */
export interface FetchClient extends FetchAdapter {

    /**
     * get 请求
     * @param options
     */
    get: (options: FetchOptions) => Promise<FetchResponse>;

    /**
     * post 请求
     * @param options
     */
    post: (options: FetchOptions) => Promise<FetchResponse>;

    /**
     * put 请求
     * @param options
     */
    put: (options: FetchOptions) => Promise<FetchResponse>;

    /**
     * delete 请求
     * @param options
     */
    delete: (options: FetchOptions) => Promise<FetchResponse>;
}