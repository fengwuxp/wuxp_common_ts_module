import {ResponseDataDecoder} from "../codec/ResponseDataDecoder";
import {FetchOptions} from "../FetchOptions";
import {FeignProxyApiServiceMethodConfig} from "../proxy/feign/FeignProxy";


/**
 * 响应数据混淆解析
 */
export default class ResponseDataObfuscationDecoder implements ResponseDataDecoder {


    decode = (response: any, ...otherArgs) => {

    };

    needExecute = (options: FetchOptions, config: FeignProxyApiServiceMethodConfig): boolean => {

        return false;
    };


}