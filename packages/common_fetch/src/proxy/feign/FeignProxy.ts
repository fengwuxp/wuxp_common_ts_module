import {ProxyApiService} from "../ProxyApiService";
import {FeignOptions} from "../../annotations/Feign";
import {RequestMappingOptions} from "../../annotations/mapping/Mapping";
import {SignatureOptions} from "../../annotations/security/Signature";
import {RetryOptions} from "../../FetchRetryOptions";
import {NeedAutoUploadOptions} from "../../annotations/upload/AutoUpload";


/**
 * feign的代理相关配置
 */
export interface FeignProxyApiServiceMethodConfig {

    /**
     * 请求配置
     */
    requestMapping?: RequestMappingOptions;

    /**
     * 签名相关
     */
    signature?: SignatureOptions;


    /**
     * 重试相关配置
     */
    retryOptions?: RetryOptions;

    /**
     * 缓存相关配置
     */
    cacheOptions?: any;

    /**
     * 自动上传的相关配置
     */
    autoUploadOptions?: NeedAutoUploadOptions;

}

/**
 * feign proxy
 */
export interface FeignProxy extends ProxyApiService {

    /**
     * 服务方法的名称或者是访问路径
     */
    serviceName: string;

    /**
     * feign的代理配置
     */
    feign: FeignOptions;

    /**
     * 获取获取接口方法的配置
     * @param serviceMethod  服务方法名称
     */
    getServiceMethodConfig: (serviceMethod: string) => FeignProxyApiServiceMethodConfig;

    /**
     * 设置服务方法的配置config
     * @param serviceMethodName
     * @param config
     */
    setServiceMethodConfig: (serviceMethodName: string, config: FeignProxyApiServiceMethodConfig) => void;


}