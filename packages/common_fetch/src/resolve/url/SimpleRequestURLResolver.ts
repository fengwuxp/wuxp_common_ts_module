import {FeignOptions} from "../../annotations/Feign";
import {RequestURLResolver} from "./RequestURLResolver";
import {MatchRuleResolver} from "../match/MatchRuleResolver";
import DefaultMatchRuleResolver from "../match/DefaultMatchRuleResolver";
import {FeignProxy} from "../../proxy/feign/FeignProxy";

/**
 * 简单的url解析者
 * 通过服务接口实例和服务方法名称以及注解的配置生成url
 */
export default class SimpleRequestURLResolver implements RequestURLResolver {


    private matchRuleResolver: MatchRuleResolver;


    constructor(matchRuleResolver?: MatchRuleResolver) {
        this.matchRuleResolver = matchRuleResolver || new DefaultMatchRuleResolver();
    }

    resolve = (apiService: FeignProxy, methodName: string, data: object): string => {

        const feignOptions = apiService.feignOptions;

        //生成 例如 @member/member/queryMember 或 @default/member/{memberId}
        const url = `${getApiUriByApiService(apiService, feignOptions)}${getApiUriByApiServiceMethod(apiService, methodName)}`;
        //替换路径参数
        return this.matchRuleResolver.resolve(url, data);
    };

}

/**
 * 通过ApiService 生成uri
 * @param apiService
 * @param feignOptions
 */
const getApiUriByApiService = (apiService: FeignProxy, feignOptions: FeignOptions) => {

    const apiModule = feignOptions.apiModule;

    //使用serviceName serviceName的值=feignOptions.value或类的名称
    const serviceName = apiService.serviceName;
    return `@${apiModule}${serviceName.startsWith("/") ? serviceName : "/" + serviceName}`;
};

/**
 * 通过 ApiService Method 生成uri
 * @param apiService
 * @param methodName
 */
const getApiUriByApiServiceMethod = (apiService: FeignProxy, methodName: string) => {

    const apiServiceConfig = apiService.getServiceMethodConfig(methodName);
    let value;
    if (apiServiceConfig.requestMapping == null || !apiServiceConfig.requestMapping.value) {
        value = methodName;
    } else {
        value = apiServiceConfig.requestMapping.value
    }

    return value.startsWith("/") ? value : `/${value}`;
};