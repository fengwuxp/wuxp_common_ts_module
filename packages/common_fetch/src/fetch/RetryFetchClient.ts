import {FetchResponse} from "../FetchOptions";
import {FetchRetryOptions, RetryOptions} from "../FetchRetryOptions";
import DefaultFetchClient from "./DefaultFetchClient";
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
        if (retryOptions.onRetry == null) {
            this.retryOptions.onRetry = this.onRetry;
        }
    }

    request = (options: FetchRetryOptions): Promise<FetchResponse> => {

        const retries = options.retries || this.retryOptions.retries;

        const _maxTimeout = options.maxTimeout || this.retryOptions.maxTimeout;

        return new Promise<FetchResponse>((resolve, reject) => {
            let count = 0;
            this.fetch(options).then(resolve).catch((response) => {
                //尝试去重试请求
                this.tryRetry(options, count, response).then(resolve).catch(reject);
            });

            setTimeout(() => {
                reject(new Error(`已重试${count}次`));
            }, _maxTimeout + retries * 10);
        });

    };


    /**
     * 尝试去重试
     * @param options
     * @param count
     * @param response
     */
    private tryRetry = (options: FetchRetryOptions, count, response): Promise<FetchResponse> => {

        const _onRetry = options.onRetry || this.retryOptions.onRetry;

        const _delay = options.delay || this.retryOptions.delay;

        const retries = options.retries || this.retryOptions.retries;

        return new Promise((resolve, reject) => {

            const errorHandle = () => {
                if (count === retries) {
                    reject(new Error(`retry ${retries}`));
                    return
                }
                setTimeout(() => {
                    _onRetry(options, response).then(resolve).catch(() => {
                        //再次进行重试
                        errorHandle()
                    }).finally(() => {
                        count++;
                    });
                }, _delay);
            };

            errorHandle();
        });
    };

    /**
     * 默认的重试处理
     * @param options
     * @param response
     */
    private onRetry<FetchResponse>(options: FetchRetryOptions, response): Promise<FetchResponse> {
        console.debug("请求错误，准备进行重试", response);
        return this.fetch(options) as any;
    }

}