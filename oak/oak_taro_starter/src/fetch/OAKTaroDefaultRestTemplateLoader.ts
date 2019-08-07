import {AbstractRestTemplateLoader} from "fengwuxp_common_fetch/src/template/RestTemplateLoader";
import {RestTemplate, RestTemplateConfig} from "fengwuxp_common_fetch/src/template/RestTemplate";
import DefaultRestTemplate from "fengwuxp_common_fetch/src/template/DefaultRestTemplate";
import {RequestMethod} from "fengwuxp_common_fetch/src/constant/RequestMethod";
import {MediaType} from "fengwuxp_common_fetch/src/constant/http/MediaType";
import DefaultApiRoutingStrategy from "fengwuxp_common_fetch/src/route/DefaultApiRoutingStrategy";
import {ApiRoutingMapping} from "fengwuxp_common_fetch/src/route/ApiRoutingStrategy";
import DefaultFetchClient from "fengwuxp_common_fetch/src/fetch/DefaultFetchClient";
import TaroFetchAdapter from "taro_starter/src/fetch/TaroFetchAdapter";
import FetchInterceptorExecutor from "fengwuxp_common_fetch/src/interceptor/FetchInterceptorExecutor";
import {FetchInterceptor} from "fengwuxp_common_fetch/src/interceptor/FetchInterceptor";
import {FetchOptions} from "fengwuxp_common_fetch/src/FetchOptions";


export default class OAKTaroDefaultRestTemplateLoader extends AbstractRestTemplateLoader {


    private routeMapping: ApiRoutingMapping;

    private interceptorList: FetchInterceptor[];

    private defaultTemplateConfig: RestTemplateConfig;

    constructor(routeMapping: ApiRoutingMapping, interceptorList: FetchInterceptor[],
                defaultProduce: MediaType,
                defaultFetchOptions: FetchOptions) {
        super();
        this.routeMapping = routeMapping;
        this.interceptorList = interceptorList;

        this.defaultTemplateConfig = {

            method: RequestMethod.POST,

            consumes: [MediaType.JSON_UTF8],

            produces: [defaultProduce || MediaType.JSON_UTF8],

            timeout: 10 * 1000,

            headers: {
                'Accept': 'application/json, application/json;charset=UTF-8, text/plain, */*'
            },
            defaultFetchOptions: defaultFetchOptions || {}
        };
    }

    buildRestTemplate = (apiModuleName: string): RestTemplate => {


        return new DefaultRestTemplate(this.defaultTemplateConfig, new DefaultApiRoutingStrategy(this.routeMapping),
            new DefaultFetchClient(new TaroFetchAdapter()),
            new FetchInterceptorExecutor(this.interceptorList));
    };


}