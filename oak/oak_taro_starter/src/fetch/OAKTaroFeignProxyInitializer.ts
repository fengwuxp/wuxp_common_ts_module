import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";
import {setProxyFactory} from "common_fetch/src/annotations/Feign";
import Es5PoxyServiceFactory from "common_fetch/src/proxy/factory/Es5PoxyServiceFactory";
import {RestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import OAKTaroDefaultRestTemplateLoader from "./OAKTaroDefaultRestTemplateLoader";
import {ProxyServiceExecutor} from "common_fetch/src/proxy/executor/ProxyServiceExecutor";
import DefaultProxyServiceExecutor from "common_fetch/src/proxy/executor/DefaultProxyServiceExecutor";
import {oakEnv} from "oak_weex_common/src/env/OAKEnvVar";
import OakApiSignatureStrategy from "oak_weex_common/src/fetch/sign/OakApiSignatureStrategy";
import {defaultApiModuleName} from "common_fetch/src/constant/FeignConstVar";
import {AppConfig} from "common_config/src/app/AppConfig";
import {FetchInterceptor} from "common_fetch/src/interceptor/FetchInterceptor";
import {ApiRoutingMapping} from "common_fetch/src/route/ApiRoutingStrategy";
import NeedProgressBarInterceptor from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import NeedAuthInterceptor from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import OAKTaroFetchProgressBar from "./OAKTaroFetchProgressBar";
import OAKTaroSyncAuthHelper from "./OAKTaroSyncAuthHelper";
import TaroUnifiedRespProcessInterceptor from "./TaroUnifiedRespProcessInterceptor";


/**
 * taro feign proxy
 */
export default class OAKTaroFeignProxyInitializer implements FeignProxyInitializer {


    private routeMapping: ApiRoutingMapping;


    private interceptorList: FetchInterceptor[];


    constructor(appConfig: AppConfig, interceptorList?: FetchInterceptor[]) {

        const routeMapping = {};
        routeMapping[defaultApiModuleName] = `${appConfig.apiEntryAddress}`;
        this.routeMapping = routeMapping;
        this.interceptorList = interceptorList || [
            new NeedProgressBarInterceptor(new OAKTaroFetchProgressBar()),
            new NeedAuthInterceptor(new OAKTaroSyncAuthHelper()),
            new TaroUnifiedRespProcessInterceptor()
        ];
    }

    initFeignProxyFactory = () => {


        const templateLoader: RestTemplateLoader = new OAKTaroDefaultRestTemplateLoader(
            this.routeMapping,
            this.interceptorList);

        const proxyServiceExecutor: ProxyServiceExecutor = new DefaultProxyServiceExecutor(
            templateLoader,
            new OakApiSignatureStrategy(
                oakEnv.clientId,
                oakEnv.clientSecret,
                "wxMinApp"
            )
        );

        const es5PoxyServiceFactory = new Es5PoxyServiceFactory(proxyServiceExecutor);

        //设置代理工厂
        setProxyFactory(es5PoxyServiceFactory);

    };


}