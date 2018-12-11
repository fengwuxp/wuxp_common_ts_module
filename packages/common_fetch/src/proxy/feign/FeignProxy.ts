import {ProxyApiService} from "../ProxyApiService";
import {FeignOptions} from "../../annotations/Feign";
import {RequestMappingOptions} from "../../annotations/mapping/Mapping";
import {SignatureOptions} from "../../annotations/security/Signature";


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