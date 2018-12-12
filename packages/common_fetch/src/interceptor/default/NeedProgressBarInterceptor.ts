import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {Timer} from "common_task/src/timer/Timer";

/**
 * 需要进度条的拦截器
 */
export default class NeedProgressBarInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    /**
     * 进度条计数器，用于在同时发起多个请求时，
     * 统一控制加载进度条
     */
    private count: number = 0;

    /**
     * 进度条
     */
    protected progressBar: FetchProgressBar;

    /**
     * 定时器
     */
    protected timer: Timer;

    /**
     * 当前执行的定时器
     */
    protected timerId;


    /**
     * 延迟显示的毫秒数
     */
    public static LAZY_TIMES: number = 200;


    constructor(progressBar: FetchProgressBar, timer?: Timer) {
        super();
        this.progressBar = progressBar;
        this.timer = timer;
    }

    preHandle(params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined {
        if (params.useProgressBar == false) {
            //不使用进度条
            return params;
        }
        let {count, progressBar} = this;
        if (count === 0) {
            //显示加载进度条
            this.timerId = setTimeout(progressBar.showProgressBar, NeedProgressBarInterceptor.LAZY_TIMES);
        }
        //计数器加一
        count++;
        return params;
    }


    postHandle(data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined {
        if (options.useProgressBar == false) {
            //不使用进度条
            return data;
        }
        let {count, timerId, progressBar} = this;
        //计数器减一
        count--;
        if (count === 0) {
            //清除定时器
            clearTimeout(timerId);
            //隐藏加载进度条
            progressBar.hideProgressBar();
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
