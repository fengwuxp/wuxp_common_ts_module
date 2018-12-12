import {FetchOptions, FetchResponse} from "../FetchOptions";
import {FetchRetryOptions, RetryOptions} from "../FetchRetryOptions";
import {FetchAdapter} from "../adapter/FetchAdapter";
import AbstractFetchClient from "./AbstractFetchClient";
import {defaultOptions} from "../annotations/retry/FetchRetry";


/**
 * 带重试的fetchClient
 */
export default class RetryFetchClient extends AbstractFetchClient<FetchRetryOptions> {

    //重试的配置
    protected retryOptions: RetryOptions;


    constructor(fetchAdapter: FetchAdapter, retryOptions?: RetryOptions) {
        super(fetchAdapter);
        this.retryOptions = {
            ...defaultOptions,
            ...(retryOptions || {}),
        };
        if (this.retryOptions.onRetry == null) {
            this.retryOptions.onRetry = this.onRetry;
        }
        if (this.retryOptions.when == null) {
            this.retryOptions.when = this.whenRetry;
        }
    }

    request = (options: FetchRetryOptions): Promise<FetchResponse> => {

        console.debug("retry client request", options);

        const retryOptions = options.retryOptions;
        
        const _maxTimeout = retryOptions.maxTimeout || this.retryOptions.maxTimeout;

        const fetchOptions = this.resolveOptions(options);

        return new Promise<FetchResponse>((resolve, reject) => {

            const _onRetry = retryOptions.onRetry || this.retryOptions.onRetry;

            const _delay = retryOptions.delay || this.retryOptions.delay;

            const retries = retryOptions.retries || this.retryOptions.retries;

            const when = retryOptions.when || this.retryOptions.when;


            let countRetry = 0;

            this.fetch(fetchOptions).then(resolve).catch((response) => {
                //尝试去重试请求
                console.debug("--失败准备重试->", response);
                const errorHandle = (resp) => {
                    if (countRetry === retries) {
                        console.debug("请求达到最大重试次数", retries);
                        reject(`请求达到最大重试次数，retry ${retries}`);
                        return
                    }
                    console.debug(`在${_delay}毫秒后准备开始第${countRetry + 1}次重试`, resp);

                    setTimeout(() => {
                        countRetry++;
                        //重试
                        _onRetry(fetchOptions, resp).then(resolve).catch((error) => {
                            if (when(error)) {
                                errorHandle(error);
                            } else {
                                console.debug("放弃重试");
                                reject(error);
                            }
                        });
                    }, _delay);
                };

                errorHandle(response);
            });

            setTimeout(() => {
                reject(new Error(`重试超时，已重试${countRetry}次`));
            }, _maxTimeout + retries * 10);
        });

    };


    /**
     * 尝试去重试
     * @param fetchOptions
     * @param options
     * @param count
     * @param response
     */
    // private tryRetry = (fetchOptions: FetchOptions, options: RetryOptions, count, response): Promise<FetchResponse> => {
    //
    //     const _onRetry = options.onRetry || this.retryOptions.onRetry;
    //
    //     const _delay = options.delay || this.retryOptions.delay;
    //
    //     const retries = options.retries || this.retryOptions.retries;
    //
    //     const when = options.when || this.retryOptions.when;
    //
    //     return new Promise((resolve, reject) => {
    //
    //         const errorHandle = (resp) => {
    //             if (count === retries) {
    //                 console.debug("请求达到最大重试次数", retries);
    //                 reject(`retry ${retries}`);
    //                 return
    //             }
    //             console.debug(`在${_delay}毫秒后准备开始第${count + 1}次重试`, resp);
    //
    //             setTimeout(() => {
    //                 count++;
    //                 _onRetry(fetchOptions, resp).then(resolve).catch((error) => {
    //                     if (when(error)) {
    //                         errorHandle(error);
    //                     } else {
    //                         console.debug("放弃重试");
    //                         reject(error);
    //                     }
    //                 });
    //             }, _delay);
    //         };
    //
    //         errorHandle(response);
    //     });
    // };

    /**
     * 默认的重试处理
     * @param options
     * @param response
     */
    private onRetry = <FetchResponse>(options: FetchOptions, response): Promise<FetchResponse> => {
        return this.fetch(options) as any;
    };


    /**
     * 是否进行重试
     * @param response
     */
    private whenRetry = (response: FetchResponse) => {
        console.log("when retry", response);
        if (response.status == null) {

            return true;
        }
        //响应码大于400没有重试的必要了
        return response.status && response.status < 400;
    };

    private resolveOptions = (retryOptions: FetchRetryOptions): FetchOptions => {

        const options = {
            ...retryOptions
        };
        delete options.retryOptions;

        return options;
    }
}