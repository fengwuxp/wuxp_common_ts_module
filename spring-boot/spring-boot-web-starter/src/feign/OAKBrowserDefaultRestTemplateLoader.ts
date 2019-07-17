import {AbstractRestTemplateLoader} from "fengwuxp_common_fetch/src/template/RestTemplateLoader";
import DefaultRestTemplate from "fengwuxp_common_fetch/src/template/DefaultRestTemplate";
import DefaultApiRoutingStrategy from "fengwuxp_common_fetch/src/route/DefaultApiRoutingStrategy";
import DefaultFetchClient from "fengwuxp_common_fetch/src/fetch/DefaultFetchClient";
import FetchInterceptorExecutor from "fengwuxp_common_fetch/src/interceptor/FetchInterceptorExecutor";
import WebFetchAdapter from "fengwuxp_common_fetch/src/adapter/web/WebFetchAdapter";
import {RequestMethod} from "fengwuxp_common_fetch/src/constant/RequestMethod";
import {MediaType} from "fengwuxp_common_fetch/src/constant/http/MediaType";
import NeedAuthInterceptor from "fengwuxp_common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchInterceptor} from "fengwuxp_common_fetch/src/interceptor/FetchInterceptor";
import {ApiRoutingMapping} from "fengwuxp_common_fetch/src/route/ApiRoutingStrategy";
import {Value} from "typescirpt-spring-context/src/annoations/Value";
import OABrowserSyncAuthHelper from "./OABrowserSyncAuthHelper";


export default class OAKBrowserDefaultRestTemplateLoader extends AbstractRestTemplateLoader {

    protected interceptorList: FetchInterceptor[];

    @Value("spring.feign.apiModules")
    protected routeMapping: ApiRoutingMapping;

    constructor(interceptorList: FetchInterceptor[]) {
        super();
        this.interceptorList = interceptorList;
    }

    buildRestTemplate = (apiModuleName: string) => {

        const needAuthInterceptor = new NeedAuthInterceptor();
        this.interceptorList.unshift(needAuthInterceptor);

        const defaultRestTemplate = new DefaultRestTemplate({
                method: RequestMethod.POST,
                consumes: [MediaType.JSON],
                produces: [MediaType.JSON],
                timeout: 10 * 1000,
                headers: {}
            }, new DefaultApiRoutingStrategy(this.routeMapping),
            new DefaultFetchClient(new WebFetchAdapter()),
            new FetchInterceptorExecutor(this.interceptorList));
        needAuthInterceptor.authHelper = new OABrowserSyncAuthHelper(defaultRestTemplate);
        return defaultRestTemplate;
    };


}