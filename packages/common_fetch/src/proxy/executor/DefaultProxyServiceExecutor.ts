import {AbstractProxyServiceExecutor} from "./ProxyServiceExecutor";
import {FetchOptions} from "../../FetchOptions";
import {MediaType} from "../../constant/http/MediaType";
import {ResponseType} from "../../constant/ResponseType";
import {FeignProxy} from "../feign/FeignProxy";
import {FetchRetryOptions} from "../../FetchRetryOptions";
import {RestTemplateLoader} from '../../template/RestTemplateLoader';
import {ApiSignatureStrategy} from "../../signature/ApiSignatureStrategy";
import {RequestURLResolver} from "../../resolve/url/RequestURLResolver";
import {RequestHeaderResolver} from "../../resolve/header/RequestHeaderResolver";
import {RequestDataEncoder} from "../RequestDataEncoder";
import {ProxyUnifiedTransformRequestFileObjectEncoder} from "../ProxyUnifiedTransformRequestFileObjectEncoder";
import DefaultFileUploadStrategy from "../../transfer/DefaultFileUploadStrategy";
import {defaultApiModuleName} from "../../constant/FeignConstVar";
import {BaseFetchOptions} from "../../BaseFetchOptions";

/**
 * 默认的代理执行器
 */
export default class DefaultProxyServiceExecutor extends AbstractProxyServiceExecutor {


    constructor(restTemplateLoader: RestTemplateLoader,
                apiSignatureStrategy: ApiSignatureStrategy,
                requestURLResolver?: RequestURLResolver,
                requestHeaderResolver?: RequestHeaderResolver,
                requestEncoders?: Array<RequestDataEncoder>) {
        super(restTemplateLoader,
            apiSignatureStrategy,
            requestURLResolver,
            requestHeaderResolver,
            requestEncoders || [
                //加入统一文件上传的支持
                new ProxyUnifiedTransformRequestFileObjectEncoder(
                    new DefaultFileUploadStrategy(restTemplateLoader.load(defaultApiModuleName))
                )
            ]);
    }

    async execute(apiService: FeignProxy, methodName: string, ...args): Promise<any> {

        const serviceMethod: Function = apiService[methodName];
        if (serviceMethod) {
            //执行原本的服务方法 @see {@link ../GenerateAnnotationMethodConfig.ts}
            serviceMethod.apply(apiService, [...args])
        }


        //原始参数
        const originalParameter = args[0] || {};

        //解析参数，进行值复制（浅拷贝）
        let data = {...originalParameter};


        const options: FetchOptions = args[1] || {};

        //解析url
        const requestURL = this.requestURLResolver.resolve(apiService, methodName, data);

        //处理请求头
        const headers = this.requestHeaderResolver.resolve(apiService, methodName, options.headers, data);

        //请求requestMapping
        const {requestMapping, signature, retryOptions} = apiService.getServiceMethodConfig(methodName);


        //解析参数生成 options，并提交请求
        const fetchOptions: BaseFetchOptions = {
            ...options,
            url: requestURL,
            headers,
            data: data
        } as BaseFetchOptions;
        if (requestMapping) {
            //进行数据合并
            fetchOptions.method = fetchOptions.method || requestMapping.method;
            fetchOptions.timeout = fetchOptions.timeout || requestMapping.timeout;
            fetchOptions.contentType = fetchOptions.contentType || requestMapping.produces[0];

            const consume = requestMapping.consumes[0];
            if (consume === MediaType.JSON_UTF8) {
                fetchOptions.responseType = ResponseType.JSON
            } else if (consume === MediaType.TEXT) {
                fetchOptions.responseType = ResponseType.TEXT
            } else {
                //默认使用json
                // fetchOptions.responseType = ResponseType.JSON;
            }
        }

        //transform request data encoder
        for (const encoder of this.requestEncoders) {
            if (!encoder.needExecute(options)) {
                continue;
            }
            try {
                data = await encoder.encode(data, apiService.getServiceMethodConfig(methodName));
            } catch (e) {
                console.error("编码转换出现异常", e);
            }
        }


        if (this.apiSignatureStrategy != null) {
            //签名处理
            const signFields = signature != null ? signature.fields : null;
            const sign = this.apiSignatureStrategy.sign(signFields, originalParameter, fetchOptions);
            fetchOptions.data = {
                ...data,
                ...sign
            };
        }

        //需要重试
        (fetchOptions as FetchRetryOptions).retryOptions = retryOptions;


        //获取请求template
        const restTemplate = this.getTemplate(apiService.feign);


        return restTemplate.fetch(fetchOptions);
    }


}