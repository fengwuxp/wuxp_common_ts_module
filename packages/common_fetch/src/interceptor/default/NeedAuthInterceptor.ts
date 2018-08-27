import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../fetch/FetchOptions";

/**
 * 需要鉴权的拦截器
 */
export default class NeedAuthInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    private authHelper: AuthHelper;


    constructor(authHelper: AuthHelper) {
        super();
        this.authHelper = authHelper;
    }

    postHandle(data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined {

        if (this.authHelper.toLogin(data)) {
            //是否需要跳转到登录页面
            return null;
        }
        return super.postHandle(data, options);
    }

    preHandle(params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined {
        if (this.authHelper.isLogin()) {

            return null;
        }
        return super.preHandle(params);
    }
}

export interface AuthHelper {

    isLogin: () => boolean;

    toLogin: (data: FetchResponse) => boolean;
}