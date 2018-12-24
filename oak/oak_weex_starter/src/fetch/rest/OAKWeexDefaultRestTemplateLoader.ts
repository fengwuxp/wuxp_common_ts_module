import {AbstractRestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import {RestTemplate} from "common_fetch/src/template/RestTemplate";
import DefaultRestTemplate from "common_fetch/src/template/DefaultRestTemplate";
import {RequestMethod} from "common_fetch/src/constant/RequestMethod";
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
import OAKWeexFetchProgressBar from "../OAKWeexFetchProgressBar";

import OAKWeexSyncAuthHelper from "../OAKWeexSyncAuthHelper";
import WeexUnifiedRespProcessInterceptor from "../interceptor/WeexUnifiedRespProcessInterceptor";

const routeMapping = {};

routeMapping[defaultApiModuleName] = `${appConfig.apiEntryAddress}`;

const interceptorList = [
    new NeedProgressBarInterceptor(new OAKWeexFetchProgressBar()),
    new NeedAuthInterceptor(new OAKWeexSyncAuthHelper()),
    new WeexUnifiedRespProcessInterceptor()
];

export default class OAKWeexDefaultRestTemplateLoader extends AbstractRestTemplateLoader {


    buildRestTemplate = (apiModuleName: string): RestTemplate => {


        return new DefaultRestTemplate({
                method: RequestMethod.POST,
                consumes: [MediaType.JSON],
                produces: [MediaType.JSON],
                timeout: 10 * 1000,
                headers: {}
            }, new DefaultApiRoutingStrategy(routeMapping),
            new DefaultFetchClient(new WeexAdapter()),
            new FetchInterceptorExecutor(interceptorList));
    };


}