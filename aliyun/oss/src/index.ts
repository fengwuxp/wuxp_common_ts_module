import AliOssClient, {OssClientOptions} from "ali-oss";
import {
    ALiYunOssFactory,
    ALiYunOssInitializer,
    ALiYunOssInitializerOptions,
    OssClientOptionalOptions
} from "./faactory/ALiYunOssInitializer";

import WebFetchAdapter from "common_fetch/src/adapter/web/WebFetchAdapter";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import StringUtils from "common_utils/lib/string/StringUtils";
import {MediaType} from "common_fetch/src/constant/http/MediaType";
import {ResponseType} from "common_fetch/src/constant/ResponseType";
import {MultipartUploadResp} from "../types/object/oss-object";
import UUIDUtil from "common_utils/lib/uuid/UUIDUtil";


export interface OakALiYunOssInitializerOptions extends OssClientOptionalOptions, ALiYunOssInitializerOptions {

    //获取配置的url
    getConfigUrl: string;

    //获取stsToken的url
    getStsTokenUrl?: string;
}


const webFetchAdapter: WebFetchAdapter = new WebFetchAdapter();

interface OssServerConfig {

    aliyunOssBuckeName: string;

    aliyunOssEndpoint: string;

    aliyunOssPrefix: string;

    aliyunOssStsRoleArn: string;

    aliyunStsAccessKeyId: string;

    aliyunStsAccessKeySecret: string;

    localServer: boolean;

    mode: string;

    oss: boolean;
}

interface AliYunStsTokenInfo {


    /**
     * 授权接入ID
     */
    accessKeyId: string;

    /**
     * 授权接入密钥
     */
    accessKeySecret: string;

    /**
     * 访问token
     */
    securityToken: string;

    /**
     * 访问token有效日期
     */
    expirationTime: string;

    /**
     * 访问token有效秒数
     */
    expirationSeconds;
}

export default class OakALiYunOssInitializer implements ALiYunOssInitializer<OakALiYunOssInitializerOptions> {

    private oakOptions: {
        prefix: string;
    };

    initFactory = (options: OakALiYunOssInitializerOptions): Promise<ALiYunOssFactory> => {

        const {getConfigUrl, getStsTokenUrl} = options;

        return Promise.all(
            [getConfigUrl, getStsTokenUrl].filter(item => StringUtils.hasText(item))
                .map((url) => {
                    return webFetchAdapter.request({
                        url,
                        headers: {
                            "Content-Type": MediaType.JSON_UTF8
                        },
                        responseType: ResponseType.JSON
                    }).then((response: FetchResponse) => {
                        const data = response.data;
                        return data.code == 0 ? data.data : null;
                    });
                })
        ).then((values) => {
            const ossServerConfig: OssServerConfig = values[0];
            const enabledOss = ossServerConfig.oss && StringUtils.hasText(ossServerConfig.aliyunStsAccessKeyId)
                && StringUtils.hasText(ossServerConfig.aliyunStsAccessKeySecret);
            if (!enabledOss) {
                return Promise.reject("oss not enabled");
            }
            const aliYunStsTokenInfo: AliYunStsTokenInfo = values[1];
            // console.log("ossServerConfig", ossServerConfig);
            // console.log("aliYunStsTokenInfo", aliYunStsTokenInfo);
            this.oakOptions = {
                prefix: ossServerConfig.aliyunOssPrefix
            };
            return new OakSTSALiYunOssFactory({
                // region: ossServerConfig["region"] || "cn-hangzhou",
                accessKeyId: aliYunStsTokenInfo.accessKeyId,
                accessKeySecret: aliYunStsTokenInfo.accessKeySecret,
                bucket: ossServerConfig.aliyunOssBuckeName,
                endpoint: ossServerConfig.aliyunOssEndpoint,
            }, aliYunStsTokenInfo);
        });

    };

    //生成上传的文件名称
    genUploadOssKey = (filename: string, extName?: string) => {
        //前缀/年份/月份日期/filename.xxx

        const date = new Date();

        const days = date.getDate();

        if (!StringUtils.hasText(extName)) {
            extName = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
        }

        const name = `${UUIDUtil.guid(16).replace(/-/g, "")}_${date.getTime()}.${extName}`;

        const key = `${this.oakOptions.prefix}/${date.getFullYear()}/${date.getMonth() + 1}${days < 10 ? "0" + days : days}/${name}`;
        console.log("上传到oos的key", key);
        return key;
    };

    /**
     * 解析上传结果
     * @param resp
     */
    resolveUploadResult = (resp: MultipartUploadResp): string[] => {
        console.log("上传结果", resp);
        const {res} = resp;

        return res.requestUrls.map(url => {

            return url.split("?")[0];
        })
    }
}

/**
 * sts token oss factory
 */
class OakSTSALiYunOssFactory implements ALiYunOssFactory {

    private ossClientOptions: OssClientOptions;


    // @doc https://www.alibabacloud.com/help/zh/doc-detail/32077.htm
    //使用ststoken模式
    private aliYunStsTokenInfo: AliYunStsTokenInfo;

    constructor(ossClientOptions: OssClientOptions, aliYunStsTokenInfo?: AliYunStsTokenInfo) {
        this.ossClientOptions = ossClientOptions;
        this.aliYunStsTokenInfo = aliYunStsTokenInfo;
    }

    factory = (ossClientOptions?: OssClientOptionalOptions): AliOssClient => {

        const options: OssClientOptions = {
            ...(ossClientOptions || {}),
            ...this.ossClientOptions
        };
        if (this.aliYunStsTokenInfo) {
            //设置sts token
            options.stsToken = this.aliYunStsTokenInfo.securityToken;
        }
        // console.log("options", options);
        return new AliOssClient(options, {});
    };


}






