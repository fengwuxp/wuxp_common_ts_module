import {RequestMappingOptions} from "../annotations/mapping/Mapping";
import {SignatureOptions} from "../annotations/security/Signature";
import {FeignOptions} from "../annotations/Feign";


export interface ProxyApiServiceMethodConfig {

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
    // feign?: FeignOptions;

    /**
     * 代理服务配置
     * key：方法名称,
     * value：ProxyApiServiceMethodConfig
     */
    // configs?: Map<string, ProxyApiServiceMethodConfig>;


    /**
     * 服务方法
     */
    // [prop: string]: ServiceMethod<any> | string;
}


/**
 * 抽象的feign proxy
 */
export abstract class FeignProxy implements ProxyApiService {

    /**
     * 接口方法配置列表
     * key 接口方法名称
     * value 接口方法配置
     */
    protected configs: Map<string, ProxyApiServiceMethodConfig> = new Map<string, ProxyApiServiceMethodConfig>();

    /**
     * feign代理的相关配置
     */
    private _feign: FeignOptions = null;


    /**
     * 获取获取接口方法的配置
     * @param serviceMethod
     */
    getServiceMethodConfig = (serviceMethod: string): ProxyApiServiceMethodConfig => {

        return this.configs.get(serviceMethod) || {};
    };


    get feign(): FeignOptions {
        return this._feign || {};
    }
}

/**
 * 代理的服务方法定义
 * @param args,参数列表中最后一个名字为 options的为 BaseFetchOptions的子类
 */
export type ProxyServiceMethod<E = any> = (...args) => Promise<E>;