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


    constructor(templateConfig: RestTemplateConfig,
                routingStrategy: ApiRoutingStrategy,
                engine: FetchClient,
                executor: FetchInterceptorExecutor) {
        super(templateConfig, routingStrategy, engine, executor);
    }

    protected getFetchClient = (options: FetchOptions) => {

        const retryOptions = (options as FetchRetryOptions).retryOptions;
        if (!!retryOptions && retryOptions.retries > 0) {
            return new RetryFetchClient(this.fetchClient["fetchAdapter"], retryOptions);
        } else {
            return this.fetchClient;
        }

    }
}