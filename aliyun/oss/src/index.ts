import AliOssClient, {OssClientOptions} from "ali-oss";
import {
    ALiYunOssFactory,
    ALiYunOssInitializer,
    ALiYunOssInitializerOptions,
    OssClientOptionalOptions
} from "./faactory/ALiYunOssInitializer";

import WebFetchAdapter from "common_fetch/src/adapter/web/WebFetchAdapter";
import {FetchResponse} from "common_fetch/src/FetchOptions";


export interface OakALiYunOssInitializerOptions extends OssClientOptionalOptions, ALiYunOssInitializerOptions {

    //获取配置的url
    getConfigUrl: string;
}

const webFetchAdapter: WebFetchAdapter = new WebFetchAdapter();


export default class OakALiYunOssInitializer implements ALiYunOssInitializer<OakALiYunOssInitializerOptions> {


    initFactory = (options: OakALiYunOssInitializerOptions): Promise<ALiYunOssFactory> => {

        const {getConfigUrl} = options;

        return webFetchAdapter.request({
            url: getConfigUrl
        }).then((response: FetchResponse<OssClientOptions>) => {
            return new OakALiYunOssFactory(response.data);
        }).catch((e) => {
            return Promise.reject(e);
        });

    };


}

class OakALiYunOssFactory implements ALiYunOssFactory {

    private ossClientOptions: OssClientOptions;


    constructor(ossClientOptions: OssClientOptions) {
        this.ossClientOptions = ossClientOptions;
    }

    factory = (ossClientOptions?: OssClientOptionalOptions): AliOssClient => {

        const options: OssClientOptions = {
            ...(ossClientOptions || {}),
            ...this.ossClientOptions
        };

        return new AliOssClient(options, {});
    };


}






