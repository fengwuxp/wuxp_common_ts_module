import {FetchOptions} from "../FetchOptions";
import {FeignProxyApiServiceMethodConfig} from "../proxy/feign/FeignProxy";

/**
 *  request data encoder
 */
export interface RequestDataEncoder<T = any> {


    /**
     * encode
     * @param request
     * @param otherArgs 其他参数
     */
    encode: (request: T, ...otherArgs) => Promise<T>;

    /**
     * 是否需要执行
     * @param options
     */
    needExecute: (options: FetchOptions, config: FeignProxyApiServiceMethodConfig) => boolean;
}