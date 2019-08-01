import {BaseFetchOptions} from "../BaseFetchOptions";
import {FetchResponse} from '../FetchOptions';

/**
 * 鉴权策略
 */
export interface AuthenticationStrategy<T extends BaseFetchOptions = BaseFetchOptions, R extends FetchResponse = FetchResponse> {


    /**
     * 本次请求是否需要token
     * @param options
     */
    needToken: (options: T) => boolean;

    /**
     * 获取token
     * @param options
     */
    getToken: (options: T) => Promise<string>;

    /**
     * 是否需要刷新token
     */
    needRefreshToken: (options: T) => Promise<boolean> | boolean;

    /**
     * 刷新token
     * @param options
     */
    refreshToken: (options: T) => Promise<string>;

    /**
     * 是否需要跳转到鉴权页面
     * @param data
     * @param options
     */
    needToAuthView: (data: R, options: T) => Promise<R> | R;
}