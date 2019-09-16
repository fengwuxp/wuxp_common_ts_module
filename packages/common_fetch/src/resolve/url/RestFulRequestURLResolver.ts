import {RequestURLResolver} from "./RequestURLResolver";
import {MatchRuleResolver} from "../match/MatchRuleResolver";
import DefaultMatchRuleResolver from "../match/DefaultMatchRuleResolver";
import {FeignProxy} from "../../proxy/feign/FeignProxy";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";
import {FeignOptions} from "../../annotations/Feign";


/**
 * 遵循restful api 风格的url resolver
 */
export default class RestFulRequestURLResolver implements RequestURLResolver {


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
    if (apiServiceConfig.requestMapping == null || apiServiceConfig.requestMapping.value == null) {
        value = "";
    } else {
        value = apiServiceConfig.requestMapping.value
    }
    if (!StringUtils.hasText(value)) {
        return value;
    }

    return value.startsWith("/") ? value : `/${value}`;
};


