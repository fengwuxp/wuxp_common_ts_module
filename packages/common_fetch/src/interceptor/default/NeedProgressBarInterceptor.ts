import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../fetch/FetchOptions";

/**
 * 需要进度条的拦截器
 */
export default class NeedProgressBarInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    /**
     * 进度条计数器，用于在同时发起多个请求时，
     * 统一控制加载进度条
     */
    private count: number = 0;

    protected progressBar: FetchProgressBar;


    constructor(progressBar: FetchProgressBar) {
        super();
        this.progressBar = progressBar;
    }

    preHandle(params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined {
        const {context} = params;
        let {count, progressBar} = this;
        if (context.useProgressBar) {
            if (count === 0) {
                //显示加载进度条
                progressBar.showProgressBar();
            }
            //计数器加一
            count++;
        }
        return params;
    }


    postHandle(data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined {
        const {context} = options;
        let {count, progressBar} = this;
        if (context.useProgressBar) {
            //计数器减一
            count--;
            if (count === 0) {
                //隐藏加载进度条
                progressBar.hideProgressBar();
            }
        }

        return data;
    }
}

/**
 * 请求进度条
 */
export interface FetchProgressBar {

    showProgressBar: () => void;

    hideProgressBar: () => void;

}