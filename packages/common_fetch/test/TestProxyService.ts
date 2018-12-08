import {AbstractRestTemplateLoader, RestTemplateLoader} from "../src/template/RestTemplateLoader";
import {defaultApiModuleName} from "../src/constant/FeignConstVar";
import DefaultRestTemplate from "../src/template/DefaultRestTemplate";
import DefaultApiRoutingStrategy from "../src/route/DefaultApiRoutingStrategy";
import CommonFetchClient from "../src/fetch/CommonFetchClient";
import WebFetchAdapter from "../src/adapter/web/WebFetchAdapter";
import FetchInterceptorExecuter from "../src/interceptor/FetchInterceptorExecuter";
import {AbstractProxyServiceExecutor, ProxyServiceExecutor} from "../src/proxy/ProxyServiceExecutor";
import {ProxyApiService} from "../src/proxy/ProxyApiService";
import Es6PoxyServiceFactory from "../src/proxy/factory/Es6PoxyServiceFactory";
import TestService from "./TestService";
import {setProxyFactory} from "../src/annotations/Feign";


const routingMapping = {};

class TestRestTemplateLoader extends AbstractRestTemplateLoader {


    buildRestTemplate = (apiModuleName: string) => {
        if (apiModuleName === defaultApiModuleName) {

            return new DefaultRestTemplate({}, new DefaultApiRoutingStrategy(routingMapping),
                new CommonFetchClient(new WebFetchAdapter()),
                new FetchInterceptorExecuter([]));
        }

        return null;
    };


}

class TestProxyServiceExecutor extends AbstractProxyServiceExecutor {


    execute<T extends ProxyApiService>(apiService: T, methodName: string, ...args): Promise<any> {
        return undefined;
    }


}

describe("test proxy api service", () => {

    const restTemplate: RestTemplateLoader = new TestRestTemplateLoader();

    const proxyServiceExecutor: ProxyServiceExecutor = new TestProxyServiceExecutor(restTemplate);

    const es6PoxyServiceFactory = new Es6PoxyServiceFactory(proxyServiceExecutor);
    //设置代理工厂
    setProxyFactory(es6PoxyServiceFactory);

    test("test",()=>{
        console.log("TestService", TestService);

        // const testService = new TestService();
        // const proxyService = es6PoxyServiceFactory.factory(testService);
    })
});
