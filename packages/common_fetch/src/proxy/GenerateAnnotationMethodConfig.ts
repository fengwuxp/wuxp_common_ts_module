import {ProxyApiService, ProxyApiServiceConfig} from "./ProxyApiService";


/**
 * 根据annotation生成代理服务方法的配置
 */
export type GenerateAnnotationMethodConfig<T extends ProxyApiService = ProxyApiService,
    O extends ProxyApiServiceConfig = ProxyApiServiceConfig> =
    (targetService: T, methodName: string, options: O) => void;


/**
 * 默认的代理服务方法配置生成
 * @param targetService
 * @param methodName
 * @param options
 */
export const defaultGenerateAnnotationMethodConfig: GenerateAnnotationMethodConfig<ProxyApiService,
    ProxyApiServiceConfig> = (targetService: ProxyApiService,
                              methodName: string,
                              options: ProxyApiServiceConfig) => {

    let config = targetService.configs.get(methodName);
    if (config == null) {
        config = {};
    }

    targetService.configs.set(methodName, {
        ...config,
        ...options
    });
};