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
    }

    request = (options: FetchRetryOptions): Promise<FetchResponse> => {

        console.log("retry client request", options);
        const retryOptions = options.retryOptions;

        const retries = retryOptions.retries || this.retryOptions.retries;

        const _maxTimeout = retryOptions.maxTimeout || this.retryOptions.maxTimeout;

        const fetchOptions = this.resolveOptions(options);

        return new Promise<FetchResponse>((resolve, reject) => {
            let count = 0;

            this.fetch(fetchOptions).then(resolve).catch((response) => {
                //尝试去重试请求
                console.debug("--失败准备重试->", response);
                this.tryRetry(fetchOptions, retryOptions, count, response).then(resolve).catch(reject);
            });

            setTimeout(() => {
                reject(new Error(`已重试${count}次`));
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
    private tryRetry = (fetchOptions: FetchOptions, options: RetryOptions, count, response): Promise<FetchResponse> => {

        const _onRetry = options.onRetry || this.retryOptions.onRetry;

        const _delay = options.delay || this.retryOptions.delay;

        const retries = options.retries || this.retryOptions.retries;

        return new Promise((resolve, reject) => {

            const errorHandle = (resp) => {
                if (count === retries) {
                    console.debug("请求达到最大重试次数", retries);
                    reject(`retry ${retries}`);
                    return
                }
                console.debug(`在${_delay}毫秒后准备开始第${count}次重试`,resp);

                setTimeout(() => {
                    count++;
                    _onRetry(fetchOptions, resp).then(resolve).catch(errorHandle);
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


    private resolveOptions = (retryOptions: FetchRetryOptions): FetchOptions => {

        const options = {
            ...retryOptions
        };
        delete options.retryOptions;

        return options;
    }
}