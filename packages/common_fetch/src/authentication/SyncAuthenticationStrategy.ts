
import {AuthenticationStrategy} from "./AuthenticationStrategy";
import {BaseFetchOptions} from "../BaseFetchOptions";
import {FetchResponse} from "../FetchOptions";

/**
 * 同步的鉴权策略
 * 在刷新token时 会阻塞所有需要token的请求，知道token刷新成功
 */
export default class SyncAuthenticationStrategy<T extends BaseFetchOptions = BaseFetchOptions, R extends FetchResponse = FetchResponse> implements AuthenticationStrategy<T,R>{


    private authenticationStrategy:AuthenticationStrategy<T,R>;


    getToken: <T>(options: T) => Promise<string>;

    needRefreshToken: <T>(options: T) => (Promise<boolean> | boolean);

    needToAuthView: <R, T>(data: R, options: T) => (Promise<R> | R);

    needToken: <T>(options: T) => boolean;

    refreshToken: <T>(options: T) => Promise<string>;



}