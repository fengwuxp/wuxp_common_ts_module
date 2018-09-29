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
            //TODO 需要跳转到登录页面
            return Promise.reject();
        }
        return super.postHandle(data, options);
    }

    preHandle(params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined {

        if (!this.authHelper.requestParamsEnhance(params)) {
            //TODO  加上鉴权信息强失败，抛出异常
            return Promise.reject()
        }

        return super.preHandle(params);
    }
}

export interface AuthHelper {


    /**
     * 请求参数信息，加上鉴权信息
     */
    requestParamsEnhance: (params: FetchOptions) => boolean;

    /**
     * 是否要跳转到鉴权的视图（登录页面）
     * @param data
     */
    isToAuthView: (data: FetchResponse) => boolean;
}
