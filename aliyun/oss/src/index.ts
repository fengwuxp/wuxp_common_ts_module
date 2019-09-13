import AliOssClient, {OssClientOptions} from "ali-oss";
import {
    ALiYunOssFactory,
    ALiYunOssInitializer,
    ALiYunOssInitializerOptions,
    OssClientOptionalOptions
} from "./faactory/ALiYunOssInitializer";

import WebFetchAdapter from "fengwuxp_common_fetch/src/adapter/web/WebFetchAdapter";
import {FetchResponse} from "fengwuxp_common_fetch/src/FetchOptions";
import StringUtils from "fengwuxp_common_utils/lib/string/StringUtils";
import {MediaType} from "fengwuxp_common_fetch/src/constant/http/MediaType";
import {ResponseType} from "fengwuxp_common_fetch/src/constant/ResponseType";
import {MultipartUploadResp} from "../types/object/oss-object";
import UUIDUtil from "fengwuxp_common_utils/lib/uuid/UUIDUtil";


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
    expirationTime: number;

    /**
     * 访问token有效秒数
     */
    expirationSeconds: number;
}

function getFetchResponsePromise(url) {
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
}

export default class OakALiYunOssInitializer implements ALiYunOssInitializer<OakALiYunOssInitializerOptions> {

    private oakOptions: {
        prefix: string;
    };

    initFactory = (options: OakALiYunOssInitializerOptions): Promise<ALiYunOssFactory> => {

        const {getConfigUrl, getStsTokenUrl} = options;

        //获取oos配置
        return getFetchResponsePromise(getConfigUrl).then((resp) => {
            const ossServerConfig: OssServerConfig = resp;
            const enabledOss = ossServerConfig.oss && StringUtils.hasText(ossServerConfig.aliyunStsAccessKeyId)
                && StringUtils.hasText(ossServerConfig.aliyunStsAccessKeySecret);
            if (!enabledOss) {
                //未启用
                return Promise.reject("oss not enabled");
            }
            return getFetchResponsePromise(getStsTokenUrl).then((aliYunStsTokenInfo) => {
                // const aliYunStsTokenInfo: AliYunStsTokenInfo = resp;
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
                    endpoint: ossServerConfig.aliyunOssEndpoint
                }, getStsTokenUrl, aliYunStsTokenInfo);
            });
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

    //oss 相关的配置
    private ossClientOptions: OssClientOptions;


    // @doc https://www.alibabacloud.com/help/zh/doc-detail/32077.htm
    //使用ststoken模式
    private aliYunStsTokenInfo: AliYunStsTokenInfo;

    //刷新sts token url
    private getStsTokenUrl: string;

    constructor(ossClientOptions: OssClientOptions,
                getStsTokenUrl: string,
                aliYunStsTokenInfo?: AliYunStsTokenInfo) {
        this.ossClientOptions = ossClientOptions;
        this.aliYunStsTokenInfo = aliYunStsTokenInfo;
        //自动刷新sts token
        this.autoRefresh();

    }

    factory = (ossClientOptions?: OssClientOptionalOptions): AliOssClient => {

        const options: OssClientOptions = {
            ...(ossClientOptions || {}),
            ...this.ossClientOptions
        };
        const aliYunStsTokenInfo = this.aliYunStsTokenInfo;
        if (aliYunStsTokenInfo) {
            //设置sts token
            options.stsToken = aliYunStsTokenInfo.securityToken;
        }
        // console.log("options", options);
        return new AliOssClient(options, {});
    };


    private autoRefresh = () => {
        const aliYunStsTokenInfo = this.aliYunStsTokenInfo;
        setTimeout(() => {
            this.refreshStsToken().then(this.autoRefresh);
            //提前2分钟刷新token
        }, aliYunStsTokenInfo.expirationTime - new Date().getTime() - 2 * 60 * 1000);
    };

    /**
     * 刷新sts token
     */
    private refreshStsToken = () => {
        // const aliYunStsTokenInfo = this.aliYunStsTokenInfo;
        // if (aliYunStsTokenInfo.expirationTime > (new Date().getTime() - 2 * 60 * 1000)) {
        //     return;
        // }

        //提前2分钟刷新
        return getFetchResponsePromise(this.getStsTokenUrl)
            .then((aliYunStsTokenInfo) => {
                this.ossClientOptions = {
                    accessKeyId: aliYunStsTokenInfo.accessKeyId,
                    accessKeySecret: aliYunStsTokenInfo.accessKeySecret,
                    ...this.ossClientOptions
                };
                this.aliYunStsTokenInfo = aliYunStsTokenInfo;
            }).catch((e) => {
                console.error(`刷新token失败：${e}`);
            });
    }
}









