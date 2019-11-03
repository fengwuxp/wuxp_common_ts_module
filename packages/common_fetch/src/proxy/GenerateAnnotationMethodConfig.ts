import {ProxyApiService} from "./ProxyApiService";
import {FeignProxy, FeignProxyApiServiceMethodConfig} from "./feign/FeignProxy";


/**
 * 根据annotation生成代理服务方法的配置
 */
export type GenerateAnnotationMethodConfig<T extends ProxyApiService = ProxyApiService,
    O extends FeignProxyApiServiceMethodConfig = FeignProxyApiServiceMethodConfig> =
    (targetService: T, methodName: string, options: O) => void;


/**
 * 默认的代理服务方法配置生成
 * @param targetService
 * @param methodName
 * @param options
 */
export const defaultGenerateAnnotationMethodConfig: GenerateAnnotationMethodConfig<FeignProxy,
    FeignProxyApiServiceMethodConfig> = (targetService: FeignProxy,
                                         methodName: string,
                                         options: FeignProxyApiServiceMethodConfig) => {
    const oldFn = targetService[methodName];

    targetService[methodName] = function (...args) {
        if (typeof oldFn === "function") {
            //保证this 不丢失
            oldFn.apply(this, [...args]);
        }
        const methodConfig = this.getServiceMethodConfig(methodName);
        this.setServiceMethodConfig(methodName, {
            ...methodConfig,
            ...options
        });
    }
};
