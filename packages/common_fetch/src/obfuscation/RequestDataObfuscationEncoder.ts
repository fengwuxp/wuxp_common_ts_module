import {RequestDataEncoder} from "../codec/RequestDataEncoder";
import {FetchOptions} from "../FetchOptions";
import {DataObfuscationStrategy} from "./DataObfuscationStrategy";
import {FeignProxyApiServiceMethodConfig} from "../proxy/feign/FeignProxy";

/**
 * 请求数据混淆 encoder
 */
export default class RequestDataObfuscationEncoder implements RequestDataEncoder {

    protected dataObfuscationStrategy: DataObfuscationStrategy;


    constructor(dataObfuscationStrategy: DataObfuscationStrategy<any>) {
        this.dataObfuscationStrategy = dataObfuscationStrategy;
    }

    encode = (request: any, config: FeignProxyApiServiceMethodConfig): Promise<any> => {

        const requestFields = config.dataObfuscationOptions.requestFields;

        requestFields.forEach((name) => {
            const datum = request[name];
            if (datum != null) {
                request[name] = this.dataObfuscationStrategy.encode(datum);
            }

        });

        return Promise.reject(request);

    };

    needExecute = (options: FetchOptions, config: FeignProxyApiServiceMethodConfig): boolean => {

        const dataObfuscationOptions = config.dataObfuscationOptions;
        if (dataObfuscationOptions == null) {
            return false;
        }
        const requestFields = dataObfuscationOptions.requestFields;

        if (requestFields == null || requestFields.length === 0) {
            return false
        }
        return true;
    };


}