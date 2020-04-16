import {AbstractRestTemplateLoader} from "fengwuxp_common_fetch/src/template/RestTemplateLoader";
import {RestTemplate} from "fengwuxp_common_fetch/src/template/RestTemplate";
import DefaultRestTemplate from "fengwuxp_common_fetch/src/template/DefaultRestTemplate";
import {RequestMethod} from "fengwuxp_common_fetch/src/constant/RequestMethod";
import {HttpMediaType} from "fengwuxp_common_fetch/src/constant/http/HttpMediaType";
import DefaultApiRoutingStrategy from "fengwuxp_common_fetch/src/route/DefaultApiRoutingStrategy";
import DefaultFetchClient from "fengwuxp_common_fetch/src/fetch/DefaultFetchClient";
import {WeexAdapter} from "fengwuxp_common_fetch/src/adapter/weex/WeexAdapter";
import FetchInterceptorExecutor from "fengwuxp_common_fetch/src/interceptor/FetchInterceptorExecutor";
import {defaultApiModuleName} from "fengwuxp_common_fetch/src/constant/FeignConstVar";
import NeedProgressBarInterceptor from "fengwuxp_common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import NeedAuthInterceptor from "fengwuxp_common_fetch/src/interceptor/default/NeedAuthInterceptor";

//@ts-ignore
import {appConfig} from '../../../../../src/config/WeexAppConfig';
import OAKWeexFetchProgressBar from "../OAKWeexFetchProgressBar";

import OAKWeexSyncAuthHelper from "../OAKWeexSyncAuthHelper";
import NeedNetworkInterceptor from "fengwuxp_common_fetch/src/interceptor/default/NeedNetworkInterceptor";
import {OAKWeexNetworkListener, OakWeexNoneNetworkFailBack} from "../OAKWeexNetworkListener";
import OakUnifiedRespProcessInterceptor from "oak_common/src/fetch/interceptor/OakUnifiedRespProcessInterceptor";
import {weexToast} from "fengwuxp_common_weex/src/toast/WeexToast";

const routeMapping = {};

routeMapping[defaultApiModuleName] = `${appConfig.apiEntryAddress}`;

const needAuthInterceptor = new NeedAuthInterceptor();
const interceptorList = [
    new NeedNetworkInterceptor(new OAKWeexNetworkListener(), new OakWeexNoneNetworkFailBack()),
    new NeedProgressBarInterceptor(new OAKWeexFetchProgressBar()),
    needAuthInterceptor,
    new OakUnifiedRespProcessInterceptor(weexToast)
];

export default class OAKWeexDefaultRestTemplateLoader extends AbstractRestTemplateLoader {


    buildRestTemplate = (apiModuleName: string): RestTemplate => {

        const defaultRestTemplate = new DefaultRestTemplate({
                method: RequestMethod.POST,
                consumes: [HttpMediaType.APPLICATION_JSON],
                produces: [HttpMediaType.APPLICATION_JSON],
                timeout: 10 * 1000,
                headers: {}
            }, new DefaultApiRoutingStrategy(routeMapping),
            new DefaultFetchClient(new WeexAdapter()),
            new FetchInterceptorExecutor(interceptorList));
        needAuthInterceptor.authHelper = new OAKWeexSyncAuthHelper(defaultRestTemplate);
        return defaultRestTemplate;
    };


}
