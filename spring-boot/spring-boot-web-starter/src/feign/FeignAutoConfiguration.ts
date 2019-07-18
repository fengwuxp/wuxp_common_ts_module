import {RestTemplate} from "fengwuxp_common_fetch/src/template/RestTemplate";
import {Bean} from "fengwuxp-spring-beans/src/annotations/Bean";
import {RestTemplateLoader} from "fengwuxp_common_fetch/src/template/RestTemplateLoader";
import {defaultApiModuleName} from "fengwuxp_common_fetch/src/constant/FeignConstVar";
import OAKBrowserDefaultRestTemplateLoader from "./OAKBrowserDefaultRestTemplateLoader";
import NeedProgressBarInterceptor
    from "fengwuxp_common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import OakUnifiedRespProcessInterceptor from "oak_common/src/fetch/interceptor/OakUnifiedRespProcessInterceptor";
import NeedAuthInterceptor from "fengwuxp_common_fetch/src/interceptor/default/NeedAuthInterceptor";


const routeMapping = {};

routeMapping[defaultApiModuleName] = `${appConfig.apiEntryAddress}`;

const needAuthInterceptor = new NeedAuthInterceptor();
const interceptorList = [
    new NeedProgressBarInterceptor(),
    needAuthInterceptor,
    new OakUnifiedRespProcessInterceptor()
];

export default class FeignAutoConfiguration {


    /**
     * default restTemplate
     */
    @Bean()
    public restTemplate = (): RestTemplate => {

        return this.restTemplateLoader().load(defaultApiModuleName);
    };

    /**
     *  rest template loader
     */
    @Bean()
    public restTemplateLoader = (): RestTemplateLoader => {
        return new OAKBrowserDefaultRestTemplateLoader() as RestTemplateLoader;
    };

    
}