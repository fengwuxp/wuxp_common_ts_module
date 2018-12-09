import {ProxyApiService} from "../ProxyApiService";
import {FeignOptions} from "../../annotations/Feign";
import {defaultApiModuleName} from "../../constant/FeignConstVar";
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
 * 抽象的feign proxy
 */
export abstract class FeignProxy implements ProxyApiService {

    /**
     * 接口方法配置列表
     * key 接口方法名称
     * value 接口方法配置
     */
    protected configs: Map<string, FeignProxyApiServiceMethodConfig> = new Map<string, FeignProxyApiServiceMethodConfig>();

    /**
     * feign代理的相关配置
     */
    protected _feign: FeignOptions = null;


    constructor(feign: FeignOptions = {apiModule: defaultApiModuleName}) {
        this._feign = feign;
    }

    /**
     * 获取获取接口方法的配置
     * @param serviceMethod  服务方法名称
     */
    getServiceMethodConfig = (serviceMethod: string): FeignProxyApiServiceMethodConfig => {

        return this.configs.get(serviceMethod) || {};
    };

    /**
     * 设置服务方法的配置config
     * @param serviceMethodName
     * @param config
     */
    setServiceMethodConfig = (serviceMethodName: string, config: FeignProxyApiServiceMethodConfig) => {
        this.configs.set(serviceMethodName, config);
    };


    get feign(): FeignOptions {
        return this._feign;
    }
}