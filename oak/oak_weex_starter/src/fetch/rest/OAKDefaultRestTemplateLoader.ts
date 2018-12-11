import {AbstractRestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import {RestTemplate} from "common_fetch/src/template/RestTemplate";
import DefaultRestTemplate from "common_fetch/src/template/DefaultRestTemplate";
import {ReqequestMethod} from "common_fetch/src/constant/ReqequestMethod";
import {MediaType} from "common_fetch/src/constant/http/MediaType";
import DefaultApiRoutingStrategy from "common_fetch/src/route/DefaultApiRoutingStrategy";
import DefaultFetchClient from "common_fetch/src/fetch/DefaultFetchClient";
import {WeexAdapter} from "common_fetch/src/adapter/weex/WeexAdapter";
import FetchInterceptorExecutor from "common_fetch/src/interceptor/FetchInterceptorExecutor";
import {defaultApiModuleName} from "common_fetch/src/constant/FeignConstVar";
import NeedProgressBarInterceptor from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import NeedAuthInterceptor from "common_fetch/src/interceptor/default/NeedAuthInterceptor";

//@ts-ignore
import {appConfig} from '../../../../../src/config/WeexAppConfig';
import OAKFetchProgressBar from "../OAKFetchProgressBar";

import OAKSimpleSyncAuthHelper from "../OAKSimpleSyncAuthHelper";
import UnifiedRespProcessInterceptor from "../interceptor/UnifiedRespProcessInterceptor";

const routeMapping = {};

routeMapping[defaultApiModuleName] = `${appConfig.httpProtocol}://${appConfig.apiDomain}/api`;

const interceptorList = [
    new NeedProgressBarInterceptor(new OAKFetchProgressBar()),
    new NeedAuthInterceptor(new OAKSimpleSyncAuthHelper()),
    new UnifiedRespProcessInterceptor()
];

export default class OAKDefaultRestTemplateLoader extends AbstractRestTemplateLoader {


    buildRestTemplate = (apiModuleName: string): RestTemplate => {


        return new DefaultRestTemplate({
                method: ReqequestMethod.POST,
                consumes: [MediaType.JSON],
                produces: [MediaType.JSON],
                timeout: 10 * 1000,
                headers: {}
            }, new DefaultApiRoutingStrategy(routeMapping),
            new DefaultFetchClient(new WeexAdapter()),
            new FetchInterceptorExecutor(interceptorList));
    };


}