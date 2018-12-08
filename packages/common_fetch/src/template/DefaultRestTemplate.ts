import {AbstractRestTemplate, RestTemplateConfig} from "./RestTemplate";
import {ApiRoutingStrategy} from "../route/ApiRoutingStrategy";
import {FetchClient} from "../fetch/FetchClient";
import FetchInterceptorExecuter from "../interceptor/FetchInterceptorExecuter";


export default class DefaultRestTemplate extends AbstractRestTemplate {


    constructor(templateConfig: RestTemplateConfig, routingStrategy: ApiRoutingStrategy, engine: FetchClient, executor: FetchInterceptorExecuter) {
        super(templateConfig, routingStrategy, engine, executor);
    }
}