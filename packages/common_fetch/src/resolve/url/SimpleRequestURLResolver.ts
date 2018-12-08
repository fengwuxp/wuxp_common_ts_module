import RequestURLResolver from "./RequestURLResolver";
import {ProxyApiService} from "../../proxy/ProxyApiService";
import {FeignOptions} from "../../annotations/Feign";
import {getApiModuleName} from "../../utils/FeignUtil";

/**
 * 简单的url解析者
 */
export default class SimpleRequestURLResolver extends RequestURLResolver {


    resolve = (apiService: ProxyApiService, serviceMethod: string): string => {


        const feignOptions = apiService.feign || {};


        //生成 例如 @member/member/queryMember 或 @default/member/queryMembe
        return `${getApiUriByApiService(apiService, feignOptions)}/${getApiUriByApiServiceMethod(apiService, serviceMethod)}`;
    };

}

/**
 * 通过ApiService 生成uri
 * @param apiService
 * @param feignOptions
 */
const getApiUriByApiService = (apiService: ProxyApiService, feignOptions: FeignOptions) => {

    const apiModule =getApiModuleName(feignOptions);

    return `@${apiModule}/${(feignOptions.value || apiService.constructor.name || apiService['serviceName'])}`;
};

/**
 * 通过 ApiService Method 生成uri
 * @param apiService
 * @param methodName
 */
const getApiUriByApiServiceMethod = (apiService: ProxyApiService, methodName: string) => {

    const apiServiceConfig = apiService.configs.get(methodName);

    if (apiServiceConfig == null || apiServiceConfig.requestMapping == null || !apiServiceConfig.requestMapping.value) {
        return methodName;
    }
    return apiServiceConfig.requestMapping.value;
};