import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";
import {RestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import OAKTaroDefaultRestTemplateLoader from "./OAKTaroDefaultRestTemplateLoader";
import DefaultProxyServiceExecutor from "common_fetch/src/proxy/executor/DefaultProxyServiceExecutor";
import OakApiSignatureStrategy from "oak_common/src/fetch/sign/OakApiSignatureStrategy";
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
import DefaultTransformDateInterceptor from "common_fetch/src/interceptor/default/DefaultTransformDateInterceptor";
import {OAKTaroNetworkListener} from "./OAKTaroNetworkListener";
import NeedNetworkInterceptor from "common_fetch/src/interceptor/default/NeedNetworkInterceptor";

interface OAKEnvVar {

    clientId: string;

    clientSecret: string;

    // channelCode: string;
}

/**
 * taro feign proxy
 */
export default class OAKTaroFeignProxyInitializer implements FeignProxyInitializer {


    private routeMapping: ApiRoutingMapping;


    private interceptorList: FetchInterceptor[];

    private oakEnvVar: OAKEnvVar;

    constructor(taro: TaroInterface,
                appConfig: AppConfig,
                oakEnvVar: OAKEnvVar,
                interceptorList?: FetchInterceptor[],) {
        //设置taro的持有者
        TaroJsHolder.setTaroHolder(taro);
        this.oakEnvVar = oakEnvVar;

        const routeMapping = {};
        routeMapping[defaultApiModuleName] = `${appConfig.apiEntryAddress}`;
        this.routeMapping = routeMapping;
        this.interceptorList = interceptorList;

    }

    initFeignProxyFactory = () => {

        const needAuthInterceptor = new NeedAuthInterceptor();
        const interceptorList = [
            new NeedNetworkInterceptor(new OAKTaroNetworkListener()),
            new NeedProgressBarInterceptor(new OAKTaroFetchProgressBar()),
            needAuthInterceptor,
            new DefaultTransformDateInterceptor(),
            new TaroUnifiedRespProcessInterceptor()
        ];

        const templateLoader: RestTemplateLoader = new OAKTaroDefaultRestTemplateLoader(
            this.routeMapping,
            interceptorList);

        //设置template
        needAuthInterceptor.authHelper = new OAKTaroSyncAuthHelper(templateLoader.load(null));

        if (this.interceptorList == null) {

            this.interceptorList = interceptorList
        }

        // const oakEnv: {
        //     clientId?: string;
        //     clientSecret?: string;
        // } = process.env.OAK || {} as any;

        FeignProxyExecutorHolder.registerDefaultExecutor(new DefaultProxyServiceExecutor(
            templateLoader,
            new OakApiSignatureStrategy(
                this.oakEnvVar.clientId,
                this.oakEnvVar.clientSecret,
                "WX_MIN_APP"
            )
        ));

    };


}