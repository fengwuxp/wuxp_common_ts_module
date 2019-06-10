import {AbstractRestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import DefaultRestTemplate from "common_fetch/src/template/DefaultRestTemplate";
import DefaultApiRoutingStrategy from "common_fetch/src/route/DefaultApiRoutingStrategy";
import DefaultFetchClient from "common_fetch/src/fetch/DefaultFetchClient";
import FetchInterceptorExecutor from "common_fetch/src/interceptor/FetchInterceptorExecutor";
import WebFetchAdapter from "common_fetch/src/adapter/web/WebFetchAdapter";
import {RequestMethod} from "common_fetch/src/constant/RequestMethod";
import {MediaType} from "common_fetch/src/constant/http/MediaType";
import NeedAuthInterceptor from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchInterceptor} from "common_fetch/src/interceptor/FetchInterceptor";


export default class OAKBrowserDefaultRestTemplateLoader extends AbstractRestTemplateLoader {

    protected interceptorList: FetchInterceptor[];

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
            }, new DefaultApiRoutingStrategy(routeMapping),
            new DefaultFetchClient(new WebFetchAdapter()),
            new FetchInterceptorExecutor(this.interceptorList));
        // needAuthInterceptor.authHelper = new OAKWeexSyncAuthHelper(defaultRestTemplate);
        return defaultRestTemplate;
    };


}