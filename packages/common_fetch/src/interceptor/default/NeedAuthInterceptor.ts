import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../FetchOptions";

/**
 * 需要鉴权的拦截器
 */
export default class NeedAuthInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    /**
     * 鉴权处理者
     */
    private authHelper: SyncAuthHelper;


    // private postLockPromise: Promise<boolean>;
    //
    // private prevLockPromise: Promise<boolean>;


    constructor(authHelper: SyncAuthHelper) {
        super();
        this.authHelper = authHelper;
    }

    postHandle(data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined {

        return this.authHelper.isToAuthView(data).then((result) => result ? data : null);
    }

    preHandle(params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined {

        //初始化锁
        // if (this.prevLockPromise == null) {
        //     this.prevLockPromise = this.authHelper.requestParamsEnhance(params);
        // }
        //
        // //锁等待
        // return new Promise<FetchOptions>((resolve, reject) => {
        //
        //     //锁释放
        //     this.prevLockPromise.then((result) => {
        //         resolve(params)
        //     }).catch(() => {
        //
        //     })
        // });

        return this.authHelper.requestParamsEnhance(params).then((result) => result ? params : null);

    }


}

interface SyncLock<T = any> {
    /**
     * 锁定
     */
    lockExecute: () => Promise<T>;

    /**
     * 解锁
     */
    unLock: () => Promise<T>;
}

export interface SyncAuthHelper<T = any> extends SyncLock<T> {


    /**
     * 请求参数信息增强，加上鉴权信息
     */
    requestParamsEnhance: (params: FetchOptions) => Promise<boolean>;

    /**
     * 是否要跳转到鉴权的视图（登录页面）
     * @param data
     */
    isToAuthView: (data: FetchResponse) => Promise<boolean>;
}
