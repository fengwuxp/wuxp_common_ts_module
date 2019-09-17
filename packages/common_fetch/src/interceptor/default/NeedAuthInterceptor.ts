import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {HttpFetchException} from "../../exception/HttpFetchException";

/**
 * 需要鉴权的拦截器
 */
export default class NeedAuthInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    /**
     * 鉴权处理者
     */
    private _authHelper: SyncAuthHelper;


    constructor(authHelper?: SyncAuthHelper) {
        super();
        this._authHelper = authHelper;
    }

    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {


        return this._authHelper.isToAuthView(data, options);
    };


    postHandleError = (exception: HttpFetchException, options: FetchOptions): HttpFetchException | Promise<HttpFetchException> | null | undefined => {


        return this._authHelper.isToAuthView(exception.response, options).finally(() => {
            return exception
        }) as any;
    };

    preHandle = (params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined => {

        //初始化请求头
        params.headers = params.headers || {};
        return this._authHelper.requestParamsEnhance(params);

    };


    set authHelper(value: SyncAuthHelper) {
        this._authHelper = value;
    }
}


export interface SyncAuthHelper<T extends FetchOptions = FetchOptions, R extends FetchResponse<any> = FetchResponse<any>> {


    /**
     * 请求参数信息增强，加上鉴权信息
     * 改方法实现时可以考虑在本地鉴权信息失效时，同步去服务端请求新的的token时，进行同步阻塞，保证后面的请求得到相同的token
     * 同步阻塞实现 @see {@link /test/helper/TestSyncAuthHelper.test.ts}
     * 也可在服务端做多个版本的token支持
     */
    requestParamsEnhance: (params: T) => Promise<T>;

    /**
     * 是否要跳转到鉴权的视图（登录页面）
     * @param data
     * @param options
     */
    isToAuthView: (data: R, options: T) => Promise<R>;
}

