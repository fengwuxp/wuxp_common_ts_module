import {FetchOptions, FetchResponse} from "../FetchOptions";
import {FetchRetryOptions, RetryOptions} from "../FetchRetryOptions";
import {FetchAdapter} from "../adapter/FetchAdapter";
import AbstractFetchClient from "./AbstractFetchClient";
import {defaultOptions} from "../annotations/retry/FetchRetry";


/**
 * 带重试的fetchClient，使用此client时每次都需要重新创建
 */
export default class RetryFetchClient extends AbstractFetchClient<FetchRetryOptions> {

    //重试的配置
    protected retryOptions: RetryOptions;

    //统计重试的请求次数
    private countRetry: number = 0;


    constructor(fetchAdapter: FetchAdapter, retryOptions: RetryOptions) {
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

    request = (options: FetchOptions): Promise<FetchResponse> => {

        const retryOptions = this.retryOptions;

        console.debug("retry client request", options, retryOptions);

        const _maxTimeout = retryOptions.maxTimeout;


        return new Promise<FetchResponse>((resolve, reject) => {


            const retries = retryOptions.retries;

            const p: Promise<FetchResponse> = this.fetch(options).catch((response) => {
                //尝试去重试请求
                console.debug("--失败准备重试->", response);
                return this.tryRetry(options, retryOptions, response);
            });

            //超时控制
            const timerId = setTimeout(() => {
                reject(new Error(`重试超时，已重试${this.countRetry}次`));
            }, _maxTimeout + retries * 10);

            p.then(resolve)
                .catch(reject)
                .finally((data) => {
                    console.log("清除定时器", timerId);
                    clearTimeout(timerId);
                    return data;
                });
        });

    };


    /**
     * 尝试去重试
     * @param fetchOptions
     * @param options
     * @param response
     */
    private tryRetry = (fetchOptions: FetchOptions, options: RetryOptions, response): Promise<FetchResponse> => {

        const _onRetry = options.onRetry || this.retryOptions.onRetry;

        const _delay = options.delay || this.retryOptions.delay;

        const retries = options.retries || this.retryOptions.retries;

        const when = options.when || this.retryOptions.when;


        return new Promise<FetchResponse>((resolve, reject) => {
            const errorHandle = (resp) => {
                if (this.countRetry === retries) {
                    console.debug("请求达到最大重试次数", retries);
                    reject(`retry end，count ${retries}`);
                    return
                }
                console.debug(`在${_delay}毫秒后准备开始第${this.countRetry + 1}次重试`, resp);

                setTimeout(() => {
                    this.countRetry++;
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
    };

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
}