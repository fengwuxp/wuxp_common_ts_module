import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";
import {RestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import OAKTaroDefaultRestTemplateLoader from "./OAKTaroDefaultRestTemplateLoader";
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
import FeignProxyExecutorHolder from "common_fetch/src/proxy/feign/FeignProxyExecutorHolder";
import TaroJsHolder, {TaroInterface} from "taro_starter/src/TaroJsHolder";


/**
 * taro feign proxy
 */
export default class OAKTaroFeignProxyInitializer implements FeignProxyInitializer {


    private routeMapping: ApiRoutingMapping;


    private interceptorList: FetchInterceptor[];

    private taro: TaroInterface;

    constructor(taro: TaroInterface, appConfig: AppConfig, interceptorList?: FetchInterceptor[],) {
        if (taro) {
            //设置taro的持有者
            TaroJsHolder.TARO = taro;
            this.taro = taro;

        }
        const routeMapping = {};
        routeMapping[defaultApiModuleName] = `${appConfig.apiEntryAddress}`;
        this.routeMapping = routeMapping;
        this.interceptorList = interceptorList || [
            new NeedProgressBarInterceptor(new OAKTaroFetchProgressBar(taro)),
            new NeedAuthInterceptor(new OAKTaroSyncAuthHelper(taro)),
            new TaroUnifiedRespProcessInterceptor(taro)
        ];

    }

    initFeignProxyFactory = () => {


        const templateLoader: RestTemplateLoader = new OAKTaroDefaultRestTemplateLoader(
            this.taro,
            this.routeMapping,
            this.interceptorList);

        console.log("--oakEnv.clientId-->", oakEnv.clientId);
        FeignProxyExecutorHolder.DEFAULT_EXECUTOR = new DefaultProxyServiceExecutor(
            templateLoader,
            new OakApiSignatureStrategy(
                oakEnv.clientId,
                oakEnv.clientSecret,
                "WX_MIN_APP"
            )
        );

    };


}