import {AbstractRestTemplate, RestTemplateConfig} from "./RestTemplate";
import {ApiRoutingStrategy} from "../route/ApiRoutingStrategy";
import {FetchClient} from "../fetch/FetchClient";
import FetchInterceptorExecutor from "../interceptor/FetchInterceptorExecutor";
import {FetchOptions} from "../FetchOptions";
import {FetchRetryOptions} from "../FetchRetryOptions";
import RetryFetchClient from "../fetch/RetryFetchClient";

/**
 * 默认的请求模板
 */
export default class DefaultRestTemplate extends AbstractRestTemplate {

    /**
     * 重试的请求客户端
     */
    protected retryClient: FetchClient;

    constructor(templateConfig: RestTemplateConfig, routingStrategy: ApiRoutingStrategy, engine: FetchClient, executor: FetchInterceptorExecutor) {
        super(templateConfig, routingStrategy, engine, executor);
    }

    protected getFetchClient = (options: FetchOptions) => {
        let retries = (options as FetchRetryOptions).retries;
        if (retries != null && retries > 0) {
            if (this.retryClient == null) {
                //初始化一个客户端
                this.retryClient = new RetryFetchClient(this.fetchClient);
            }
            return this.retryClient;
        } else {
            return this.fetchClient;
        }

    }
}