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

        if (this.authHelper.isToAuthView(data)) {
            //是否需要跳转到登录页面
            return null;
        }
        return super.postHandle(data, options);
    }

    preHandle(params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined {

        if (!this.authHelper.autEnhance(params)) {
            //TODO  鉴权增强失败
        }

        return super.preHandle(params);
    }
}

export interface AuthHelper {


    /**
     * 鉴权增强
     */
    autEnhance: (params: FetchOptions) => boolean;

    /**
     * 是否要跳转到鉴权的视图（登录页面）
     * @param data
     */
    isToAuthView: (data: FetchResponse) => boolean;
}
