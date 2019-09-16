import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {AuthenticationStrategy} from "../../authentication/AuthenticationStrategy";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


/**
 * 通用的请求鉴权拦截器器
 */
export default class AuthenticationInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    private authenticationStrategy: AuthenticationStrategy<FetchOptions, FetchResponse>;

    //是否处于刷新token的状态
    protected static IS_REFRESH_TOKEN_ING = false;

    // protected static waitingQueue: Array<any> = [];
    protected static WAITING_QUEUE: Array<{
        resolve: (value?: any | PromiseLike<any>) => void;
        reject: (reason?: any) => void;
    }> = [];

    /**
     * 加入鉴权的token 名称
     * 默认 token
     */
    protected authorizationHeaderName: string;

    constructor(authenticationStrategy: AuthenticationStrategy<FetchOptions>, authorizationHeaderName?: string) {
        super();
        this.authenticationStrategy = authenticationStrategy;
        this.authorizationHeaderName = authorizationHeaderName || "token";
    }

    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {


        return this.authenticationStrategy.needToAuthView(data, options);
    };

    preHandle = async (options: FetchOptions): Promise<FetchOptions> => {

        let authorizationHeaderName = this.authorizationHeaderName;
        const authorizationHeaderValue: string = options.headers[authorizationHeaderName];
        if (StringUtils.hasText(authorizationHeaderValue)) {
            //如果默认有传鉴权字段，则不再处理
            return options;
        }

        const authenticationStrategy = this.authenticationStrategy;
        const needToken: boolean = await authenticationStrategy.needToken(options);
        if (!needToken) {
            return options;
        }

        if (AuthenticationInterceptor.IS_REFRESH_TOKEN_ING) {
            return new Promise((resolve, reject) => {
                AuthenticationInterceptor.WAITING_QUEUE.push({
                    resolve,
                    reject
                });
                console.log("加入等待队列", AuthenticationInterceptor.WAITING_QUEUE.length);
            });
        }

        //需要刷新token
        const needRefreshToken = await authenticationStrategy.needRefreshToken(options);
        if (needRefreshToken) {
            let token = null;
            try {
                AuthenticationInterceptor.IS_REFRESH_TOKEN_ING = true;
                token = await authenticationStrategy.refreshToken(options);
                AuthenticationInterceptor.IS_REFRESH_TOKEN_ING = false;
                options.headers[authorizationHeaderName] = token;
            } catch (e) {
                console.error("token refresh error", e);
            }
            //释放等待队列
            if (AuthenticationInterceptor.WAITING_QUEUE.length > 0) {
                const refreshSuccess = token != null;
                AuthenticationInterceptor.WAITING_QUEUE.forEach(({resolve, reject}) => {
                    if (refreshSuccess) {
                        resolve(options);
                    } else {
                        reject();
                    }
                });
                console.log("清空等待队列", AuthenticationInterceptor.WAITING_QUEUE.length);
                AuthenticationInterceptor.WAITING_QUEUE = [];
            }
        } else {
            options.headers[authorizationHeaderName] = await authenticationStrategy.getToken(options);
        }
        return options;
    };
}
