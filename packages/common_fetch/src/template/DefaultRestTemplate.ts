import {AbstractRestTemplate, RestTemplateConfig} from "./RestTemplate";
import {ApiRoutingStrategy} from "../route/ApiRoutingStrategy";
import {FetchClient} from "../fetch/FetchClient";
import FetchInterceptorExecutor from "../interceptor/FetchInterceptorExecutor";


export default class DefaultRestTemplate extends AbstractRestTemplate {


    constructor(templateConfig: RestTemplateConfig, routingStrategy: ApiRoutingStrategy, engine: FetchClient, executor: FetchInterceptorExecutor) {
        super(templateConfig, routingStrategy, engine, executor);
    }
}