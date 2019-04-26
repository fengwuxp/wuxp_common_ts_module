import {FetchOptions} from "../FetchOptions";
import {FeignProxyApiServiceMethodConfig} from "../proxy/feign/FeignProxy";

/**
 * response data decoder
 */
export interface ResponseDataDecoder<T = any> {

    /**
     * decode
     * @param response
     * @param otherArgs 其他参数
     */
    decode: (response: T, ...otherArgs) => T;

    /**
     * 是否需要执行
     * @param options
     */
    needExecute: (options: FetchOptions, config: FeignProxyApiServiceMethodConfig) => boolean;
}