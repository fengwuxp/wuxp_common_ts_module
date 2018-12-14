import {AbstractRestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import {RestTemplate} from "common_fetch/src/template/RestTemplate";
import DefaultRestTemplate from "common_fetch/src/template/DefaultRestTemplate";
import {ReqequestMethod} from "common_fetch/src/constant/ReqequestMethod";
import {MediaType} from "common_fetch/src/constant/http/MediaType";
import DefaultApiRoutingStrategy from "common_fetch/src/route/DefaultApiRoutingStrategy";
import {ApiRoutingMapping} from "common_fetch/src/route/ApiRoutingStrategy";
import DefaultFetchClient from "common_fetch/src/fetch/DefaultFetchClient";
import TaroFetchAdapter from "taro_starter/src/fetch/TaroFetchAdapter";
import FetchInterceptorExecutor from "common_fetch/src/interceptor/FetchInterceptorExecutor";
import {FetchInterceptor} from "common_fetch/src/interceptor/FetchInterceptor";


export default class OAKTaroDefaultRestTemplateLoader extends AbstractRestTemplateLoader {


    private routeMapping: ApiRoutingMapping;

    private interceptorList: FetchInterceptor[];


    private taro: any;

    constructor(taro, routeMapping: ApiRoutingMapping, interceptorList: FetchInterceptor[]) {
        super();
        this.routeMapping = routeMapping;
        this.interceptorList = interceptorList;
        this.taro = taro;
    }

    buildRestTemplate = (apiModuleName: string): RestTemplate => {


        return new DefaultRestTemplate({
                method: ReqequestMethod.POST,
                consumes: [MediaType.JSON],
                produces: [MediaType.JSON],
                timeout: 10 * 1000,
                headers: {}
            }, new DefaultApiRoutingStrategy(this.routeMapping),
            new DefaultFetchClient(new TaroFetchAdapter(this.taro)),
            new FetchInterceptorExecutor(this.interceptorList));
    };


}