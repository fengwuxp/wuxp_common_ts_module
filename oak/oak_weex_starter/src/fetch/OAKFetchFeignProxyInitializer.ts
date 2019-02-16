import {RestTemplateLoader} from "common_fetch/src/template/RestTemplateLoader";
import OAKWeexDefaultRestTemplateLoader from "./rest/OAKWeexDefaultRestTemplateLoader";
import DefaultProxyServiceExecutor from "common_fetch/src/proxy/executor/DefaultProxyServiceExecutor";
import OakApiSignatureStrategy from "oak_weex_common/src/fetch/sign/OakApiSignatureStrategy";
import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";
import {oakEnv} from "oak_weex_common/src/env/OAKEnvVar";
import {isWeb, isAndroid} from "common_weex/src/constant/WeexEnv";
import FeignProxyExecutorHolder from "common_fetch/src/proxy/feign/FeignProxyExecutorHolder";
import {ProxyUnifiedTransformRequestFileObjectEncoder} from "common_fetch/src/proxy/ProxyUnifiedTransformRequestFileObjectEncoder";
import DefaultFileUploadStrategy from "common_fetch/src/transfer/DefaultFileUploadStrategy";
import {defaultApiModuleName} from "common_fetch/src/constant/FeignConstVar";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {MediaType} from "common_fetch/src/constant/http/MediaType";
import {FileUploadOptions} from "common_fetch/src/transfer/FileTransmitter";


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
        FeignProxyExecutorHolder.DEFAULT_EXECUTOR = new DefaultProxyServiceExecutor(
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
                            contentType: MediaType.JSON
                        } as FileUploadOptions
                    )
                )
            ]
        )
        ;

    }


}