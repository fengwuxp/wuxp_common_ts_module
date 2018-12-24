import {RestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import OAKWeexDefaultRestTemplateLoader from "./rest/OAKWeexDefaultRestTemplateLoader";
import DefaultProxyServiceExecutor from "common_fetch/src/proxy/executor/DefaultProxyServiceExecutor";
import OakApiSignatureStrategy from "oak_weex_common/src/fetch/sign/OakApiSignatureStrategy";
import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";
import {oakEnv} from "oak_weex_common/src/env/OAKEnvVar";
import {isWeb, isAndroid} from "common_weex/src/constant/WeexEnv";
import FeignProxyExecutorHolder from "common_fetch/src/proxy/feign/FeignProxyExecutorHolder";


export default class DefaultFetchFeignProxyInitializer implements FeignProxyInitializer {


    protected initStatus: boolean = false;

    initFeignProxyFactory = () => {
        if (this.initStatus) {
            return;
        }
        this.initStatus = true;

        const templateLoader: RestTemplateLoader = new OAKWeexDefaultRestTemplateLoader();


        //设置代理持有者
        FeignProxyExecutorHolder.DEFAULT_EXECUTOR = new DefaultProxyServiceExecutor(
            templateLoader,
            new OakApiSignatureStrategy(
                oakEnv.clientId,
                oakEnv.clientSecret,
                isWeb ? "web" : isAndroid ? "android" : "ios"
            )
        );

    }


}