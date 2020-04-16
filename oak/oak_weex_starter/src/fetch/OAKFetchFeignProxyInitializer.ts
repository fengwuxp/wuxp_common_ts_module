import {RestTemplateLoader} from "fengwuxp_common_fetch/src/template/RestTemplateLoader";
import OAKWeexDefaultRestTemplateLoader from "./rest/OAKWeexDefaultRestTemplateLoader";
import DefaultProxyServiceExecutor from "fengwuxp_common_fetch/src/proxy/executor/DefaultProxyServiceExecutor";
import OakApiSignatureStrategy from "oak_common/src/fetch/sign/OakApiSignatureStrategy";
import {FeignProxyInitializer} from "fengwuxp_common_fetch/src/proxy/feign/FeignProxyInitializer";
import {oakEnv} from "oak_common/src/env/OAKEnvVar";
import {isWeb, isAndroid} from "fengwuxp_common_weex/src/constant/WeexEnv";
import FeignProxyExecutorHolder from "fengwuxp_common_fetch/src/proxy/feign/FeignProxyExecutorHolder";
import {ProxyUnifiedTransformRequestFileObjectEncoder} from "fengwuxp_common_fetch/src/proxy/ProxyUnifiedTransformRequestFileObjectEncoder";
import DefaultFileUploadStrategy from "fengwuxp_common_fetch/src/transfer/DefaultFileUploadStrategy";
import {defaultApiModuleName} from "fengwuxp_common_fetch/src/constant/FeignConstVar";
import AppConfigRegistry from "fengwuxp_common_config/src/app/AppConfigRegistry";
import {HttpMediaType} from "fengwuxp_common_fetch/src/constant/http/HttpMediaType";
import {FileUploadOptions} from "fengwuxp_common_fetch/src/transfer/FileTransmitter";


export default class DefaultFetchFeignProxyInitializer implements FeignProxyInitializer {


    protected initStatus: boolean = false;

    initFeignProxyFactory = () => {
        if (this.initStatus) {
            return;
        }
        this.initStatus = true;

        const templateLoader: RestTemplateLoader = new OAKWeexDefaultRestTemplateLoader();


        //设置代理持有者
        const url = `@${defaultApiModuleName}/system/uploadFile` || AppConfigRegistry.get().uploadFileURL;
        FeignProxyExecutorHolder.registerDefaultExecutor(
            new DefaultProxyServiceExecutor(
                templateLoader,
                new OakApiSignatureStrategy(
                    oakEnv.clientId,
                    oakEnv.clientSecret,
                    isWeb ? "WEB" : isAndroid ? "ANDROID" : "IOS",
                ),
                //undefined 表示使用默认
                undefined,
                undefined,
                [
                    //文件上传处理
                    new ProxyUnifiedTransformRequestFileObjectEncoder(
                        new DefaultFileUploadStrategy(
                            templateLoader.load(defaultApiModuleName),
                            {
                                url: url,
                                formDataFileName: "base64Data",
                                contentType: HttpMediaType.APPLICATION_JSON
                            } as FileUploadOptions
                        )
                    )
                ]
            ));

    }
}
