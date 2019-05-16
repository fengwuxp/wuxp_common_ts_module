import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse, ProgressBarOptions} from "../../FetchOptions";
import {Timer} from "common_task/src/timer/Timer";

/**
 * 需要进度条的拦截器
 */
export default class NeedProgressBarInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    /**
     * 进度条计数器，用于在同时发起多个请求时，
     * 统一控制加载进度条
     */
    private static count: number = 0;

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
     * 进度条的相关配置
     */
    protected progressBarOptions: ProgressBarOptions;

    /**
     * 防止抖动，在接口很快响应的时候，不显示进度条
     */
    protected preventJitter: boolean = true;


    constructor(progressBar: FetchProgressBar, progressBarOptions?: ProgressBarOptions, timer?: Timer) {
        super();
        this.progressBar = progressBar;
        this.progressBarOptions = progressBarOptions || {
            //默认延迟300毫秒
            delay: 300,
            mask: false
        };
        this.timer = timer;
        //延迟显示的时间最少要大于等于100毫秒才会启用防止抖动的模式
        this.preventJitter = this.progressBarOptions.delay >= 100;
    }

    preHandle = (params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined => {
        if (params.useProgressBar == false) {
            //不使用进度条
            return params;
        }
        let {progressBar} = this;
        if (NeedProgressBarInterceptor.count === 0) {
            const progressBarOptions = {
                ...this.progressBarOptions,
                ...(params.progressBarOptions || {})
            };
            //显示加载进度条
            if (this.preventJitter) {
                this.timerId = setTimeout(() => {
                    progressBar.showProgressBar(progressBarOptions);
                }, this.progressBarOptions.delay);
            } else {
                progressBar.showProgressBar(progressBarOptions);
            }
        }

        //计数器加一
        NeedProgressBarInterceptor.count++;
        return params;
    };


    postHandleCompleted = (response, options: FetchOptions) => {
        if (options.useProgressBar == false) {
            //不使用进度条
            return response;
        }
        let {timerId, progressBar} = this;
        //计数器减一
        NeedProgressBarInterceptor.count--;
        if (NeedProgressBarInterceptor.count === 0) {
            //清除定时器
            clearTimeout(timerId);
            //隐藏加载进度条
            progressBar.hideProgressBar();
        }

        return response;
    }
}

/**
 * 请求进度条
 */
export interface FetchProgressBar {

    showProgressBar: (progressBarOptions?: ProgressBarOptions) => void;

    hideProgressBar: () => void;

}
