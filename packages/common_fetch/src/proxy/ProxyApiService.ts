import {FetchOptions} from "../fetch/FetchOptions";
import {RequestMappingOptions} from "../annotations/mapping/Mapping";
import {SignatureOptions} from "../annotations/security/Signature";
import {FeignOptions} from "../annotations/Feign";


export interface ProxyApiServiceConfig {

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
 * 代理的服务 定义
 */
export interface ProxyApiService {


    /**
     * feign配置
     */
    feign?: FeignOptions;

    /**
     * 代理服务配置
     * key：方法名称,
     * value：ProxyApiServiceConfig
     */
    configs?: Map<string, ProxyApiServiceConfig>;


    /**
     * 服务方法
     */
    // [prop: string]: ServiceMethod<any> | string;
}


/**
 * 抽象的feign proxy
 */
export abstract class FeignProxy implements ProxyApiService {

    configs: Map<string, ProxyApiServiceConfig> = new Map<string, ProxyApiServiceConfig>();

    feign: FeignOptions = null;


}

/**
 * 代理的服务方法定义
 * @param args,参数列表中最后一个名字为 options的为 BaseFetchOptions的子类
 */
export type ProxyServiceMethod<E = any> = (...args) => Promise<E>;