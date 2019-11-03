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

type GetConfigFunction = () => Promise<any>;

export interface OakALiYunOssInitializerOptions extends OssClientOptionalOptions, ALiYunOssInitializerOptions {

    //获取配置的url或方法
    getConfigUrl: GetConfigFunction | string;

    //获取配置的url或方法
    getStsTokenUrl?: GetConfigFunction | string;
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

function getFetchResponsePromise(url: string | Function) {

    if (typeof url === "function") {
        return url();
    }

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
            const enabledOss = (ossServerConfig.oss || ossServerConfig.mode === "oss")
                && StringUtils.hasText(ossServerConfig.aliyunStsAccessKeyId)
                && StringUtils.hasText(ossServerConfig.aliyunStsAccessKeySecret);
            if (!enabledOss) {
                //未启用
                return Promise.reject("oss not enabled");
            }
            this.oakOptions = {
                prefix: ossServerConfig.aliyunOssPrefix
            };
            return new OakSTSALiYunOssFactory({
                region: ossServerConfig["region"] || "cn-hangzhou",
                accessKeyId: null,
                accessKeySecret: null,
                bucket: ossServerConfig.aliyunOssBuckeName,
                endpoint: ossServerConfig.aliyunOssEndpoint
            }, getStsTokenUrl, null);
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
    private getStsTokenUrl: GetConfigFunction | string;

    constructor(ossClientOptions: OssClientOptions,
                getStsTokenUrl: GetConfigFunction | string,
                aliYunStsTokenInfo?: AliYunStsTokenInfo) {
        this.ossClientOptions = ossClientOptions;
        this.aliYunStsTokenInfo = aliYunStsTokenInfo;
        this.getStsTokenUrl = getStsTokenUrl;
    }

    factory = async (ossClientOptions?: OssClientOptionalOptions): Promise<AliOssClient> => {

        const aliYunStsTokenInfo = this.aliYunStsTokenInfo;

        //提前3分钟刷新token
        const needRefreshToken = aliYunStsTokenInfo == null || new Date().getTime() + 3 * 60 * 1000 > aliYunStsTokenInfo.expirationTime;
        if (needRefreshToken) {
            // 刷新token
            await this.refreshStsToken();
        }
        const options: OssClientOptions = {
            ...(ossClientOptions || {}),
            ...this.ossClientOptions
        };
        return new AliOssClient(options, {});
    };

    /**
     * 刷新sts token
     */
    private refreshStsToken = () => {

        return getFetchResponsePromise(this.getStsTokenUrl)
            .then((aliYunStsTokenInfo: AliYunStsTokenInfo) => {
                this.ossClientOptions = {
                    ...this.ossClientOptions,
                    stsToken: aliYunStsTokenInfo.securityToken,
                    accessKeyId: aliYunStsTokenInfo.accessKeyId,
                    accessKeySecret: aliYunStsTokenInfo.accessKeySecret,
                };
                this.aliYunStsTokenInfo = aliYunStsTokenInfo;
            }).catch((e) => {
                console.error(`刷新token失败：${e}`);
                return Promise.reject(e);
            });
    }
}









