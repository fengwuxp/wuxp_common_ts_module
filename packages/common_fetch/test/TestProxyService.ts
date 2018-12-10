import {AbstractRestTemplateLoader, RestTemplateLoader} from "../src/template/RestTemplateLoader";
import {defaultApiModuleName} from "../src/constant/FeignConstVar";
import DefaultRestTemplate from "../src/template/DefaultRestTemplate";
import DefaultApiRoutingStrategy from "../src/route/DefaultApiRoutingStrategy";
import DefaultFetchClient from "../src/fetch/DefaultFetchClient";
import WebFetchAdapter from "../src/adapter/web/WebFetchAdapter";
import FetchInterceptorExecutor from "../src/interceptor/FetchInterceptorExecutor";
import {ProxyServiceExecutor} from "../src/proxy/executor/ProxyServiceExecutor";
import Es6PoxyServiceFactory from "../src/proxy/factory/Es6PoxyServiceFactory";

import {setProxyFactory} from "../src/annotations/Feign";
import * as log4js from "log4js";
import DefaultProxyServiceExecutor from "../src/proxy/executor/DefaultProxyServiceExecutor";

const logger = log4js.getLogger();
logger.level = 'debug';


const routingMapping = {
    member: "https://test.oaknt.com/api"
};

class TestRestTemplateLoader extends AbstractRestTemplateLoader {


    buildRestTemplate = (apiModuleName: string) => {
        if (apiModuleName === defaultApiModuleName) {
            //TODO

        }

        const restTemplate = new DefaultRestTemplate({}, new DefaultApiRoutingStrategy(routingMapping),
            new DefaultFetchClient(new WebFetchAdapter()),
            new FetchInterceptorExecutor([]));
        return restTemplate;
    };
}


class TestApiSignatureStrategy implements SimpleApiSignatureStrategy {

    private clientId: string;

    /**
     * 签名秘钥
     */
    private clientSecret: string;


    private channelCode: string;


    constructor(clientId: string, clientSecret: string, channelCode: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.channelCode = channelCode;
    }

    sign = (fields: string[], data: (object | any)) => {

        let sign = {};

        //签名处理
        sign['clientId'] = this.clientId;
        sign['timestamp'] = new Date().getTime().toString();
        sign['channelCode'] = this.channelCode;
        sign['sign'] = apiSign(fields, data, this.clientSecret, this.channelCode);

        // logger.debug("--签名结果->", sign);
        return sign;
    };


}


class TestProxyServiceExecutor extends DefaultProxyServiceExecutor {
}

const restTemplate: RestTemplateLoader = new TestRestTemplateLoader();

const proxyServiceExecutor: ProxyServiceExecutor = new TestProxyServiceExecutor(restTemplate,
    new TestApiSignatureStrategy("a", "b", "node"));

const es6PoxyServiceFactory = new Es6PoxyServiceFactory(proxyServiceExecutor);
//设置代理工厂
setProxyFactory(es6PoxyServiceFactory);


import TestService from "./TestService";
import {SimpleApiSignatureStrategy} from "../src/signature/ApiSignatureStrategy";
import {apiSign} from "./utils/ApiSginUtils";

describe("test proxy api service", () => {


    test("test", () => {


        const testService = new TestService();
        testService.findMember({
            userName: "12",
            memberId: 2
        }).then(() => {

        }).catch((e) => {
            logger.debug(e);
        });

        testService.testQuery({memberId: 1}).then((data) => {
            console.log(data);
        }).catch((e) => {
            console.log(e);
        });

        // testService.deleteMember({memberId: 1});
    })
});
