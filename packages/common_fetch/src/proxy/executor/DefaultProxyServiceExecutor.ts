import {AbstractProxyServiceExecutor} from "./ProxyServiceExecutor";
import {FetchOptions} from "../../FetchOptions";
import {MediaType} from "../../constant/http/MediaType";
import {DataType} from "../../constant/DataType";
import {FeignProxy} from "../feign/FeignProxy";


/**
 * 默认的代理执行器
 */
export default class DefaultProxyServiceExecutor extends AbstractProxyServiceExecutor {


    execute(apiService: FeignProxy, methodName: string, ...args): Promise<any> {

        const serviceMethod: Function = apiService[methodName];
        if (serviceMethod) {
            //执行原本的服务方法 @see {@link ../GenerateAnnotationMethodConfig.ts}
            serviceMethod.apply(apiService, [...args])
        }


        //原始参数
        const originalParameter = args[0] || {};

        //解析参数，复制一份值
        const data = {...originalParameter};

        const options: FetchOptions = args[1] || {};

        //解析url
        const requestURL = this.requestURLResolver.resolve(apiService, methodName, data);

        //处理请求头
        const headers = this.requestHeaderResolver.resolve(apiService, methodName, options.headers, data);


        //请求requestMapping
        const {requestMapping, signature} = apiService.getServiceMethodConfig(methodName);

        //解析参数生成 options，并提交请求
        const fetchOptions = {
            ...options,
            url: requestURL,
            headers,
            data: data
        };
        if (requestMapping) {
            //进行数据合并
            fetchOptions.method = requestMapping.method;
            fetchOptions.timeout = requestMapping.timeout;
            fetchOptions.contentType = requestMapping.produces[0];

            const consume = requestMapping.consumes[0];
            if (consume === MediaType.JSON) {
                fetchOptions.dataType = DataType.JSON
            } else if (consume === MediaType.TEXT) {
                fetchOptions.dataType = DataType.TEXT
            } else {
                //默认使用json
                // fetchOptions.dataType = DataType.JSON;
            }
        }

        if (signature) {
            //签名处理
            const sign = this.apiSignatureStrategy.sign(signature.fields, originalParameter);
            fetchOptions.data = {
                ...data,
                ...sign
            }
        }


        //获取请求template
        const restTemplate = this.getTemplate(apiService.feign);


        return restTemplate.fetch(fetchOptions);
    }


}