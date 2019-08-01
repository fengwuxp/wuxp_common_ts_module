import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {AuthenticationStrategy} from "../../authentication/AuthenticationStrategy";


/**
 * 通用的请求鉴权拦截器器
 */
export default class AuthenticationInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    private authenticationStrategy: AuthenticationStrategy<FetchOptions, FetchResponse>;

    //是否处于刷新token的状态
    private static IS_REFRESH_TOKEN_ING = false;

    constructor(authenticationStrategy: AuthenticationStrategy<FetchOptions>) {
        super();
        this.authenticationStrategy = authenticationStrategy;
    }

    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {


        return this.authenticationStrategy.needToAuthView(data, options);
    };

    preHandle = async (options: FetchOptions): Promise<FetchOptions> => {

        const authenticationStrategy = this.authenticationStrategy;

        const needToken: boolean = await authenticationStrategy.needToken(options);
        if (!needToken) {
            return options;
        }

        //需要刷新token
        const needRefreshToken = await authenticationStrategy.needRefreshToken(options);
        if (needRefreshToken) {

        } else {

        }

        return null;
    };
}