import {AbstractRestTemplateLoader, RestTemplateLoader} from "../src/template/RestTemplateLoader";
import {defaultApiModuleName} from "../src/constant/FeignConstVar";
import DefaultRestTemplate from "../src/template/DefaultRestTemplate";
import DefaultApiRoutingStrategy from "../src/route/DefaultApiRoutingStrategy";
import DefaultFetchClient from "../src/fetch/DefaultFetchClient";
import FetchInterceptorExecutor from "../src/interceptor/FetchInterceptorExecutor";
import {ProxyServiceExecutor} from "../src/proxy/executor/ProxyServiceExecutor";
import * as log4js from "log4js";
import DefaultProxyServiceExecutor from "../src/proxy/executor/DefaultProxyServiceExecutor";
import TestService from "./services/TestService";
import {SimpleApiSignatureStrategy} from "../src/signature/ApiSignatureStrategy";
import {apiSign} from "./utils/ApiSginUtils";
import {RequestMethod} from "../src/constant/RequestMethod";
import {MediaType} from "../src/constant/http/MediaType";
// import {MockFetchAdapter} from "./mock/MockFetchAdapter";
import FeignProxyExecutorHolder from "../src/proxy/feign/FeignProxyExecutorHolder";
import FilterEmptyStringParamInterceptor from "../src/interceptor/default/FilterEmptyStringParamInterceptor";
import SystemService from "./services/SystemService";
import NodeFetchAdapter from "../src/adapter/node/NodeFetchAdapter";
import MockFetchAdapter from "../src/adapter/mock/MockFetchAdapter";

const logger = log4js.getLogger();
logger.level = 'debug';


const routingMapping = {
    default: "http://127.0.0.1:18080/api"
};

class TestRestTemplateLoader extends AbstractRestTemplateLoader {


    buildRestTemplate = (apiModuleName: string) => {
        if (apiModuleName === defaultApiModuleName) {
            //TODO

        }

        const restTemplate = new DefaultRestTemplate({
                method: RequestMethod.POST,
                consumes: [MediaType.JSON_UTF8],
                produces: [MediaType.JSON_UTF8],
                timeout: 10 * 1000,
                headers: {},
                defaultFetchOptions: {
                    filterEmptyString: true
                },
            }, new DefaultApiRoutingStrategy(routingMapping),
            // new DefaultFetchClient(new NodeFetchAdapter()),
            new DefaultFetchClient(new MockFetchAdapter("")),
            new FetchInterceptorExecutor([
                new FilterEmptyStringParamInterceptor()
            ]));
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
    new TestApiSignatureStrategy("app", "2aecdd9db7d816462e2232632c90f8fa", "WEB"));


//设置代理执行器
FeignProxyExecutorHolder.registerDefaultExecutor(proxyServiceExecutor);


describe("test proxy api service", () => {


    test("node evn http", async () => {

        await SystemService.currentTime({}).then((data) => {

            logger.info(`数据`, data);
        }).catch((error) => {
            logger.error(`异常 `, error);
        });

    }, 30 * 1000);

    test("test mock api method", async () => {


        const testService = new TestService();
        // testService.findMember({
        //     userName: "12",
        //     memberId: 2
        // }).then(() => {
        //
        // }).catch((e) => {
        //     logger.debug(e);
        // });

        await testService.testQuery({
            memberId: 1,
            status: ["A", "B"],
            val: 2
            // file: new Blob()
        }, {
            filterEmptyString: false
        }).then((data) => {
            logger.debug("--请求结束，成功->", data);
        }).catch((e) => {
            logger.debug("--请求结束，失败-->", e);
        }).finally(() => {

        });

        // testService.deleteMember({memberId: 1});
    }, 30 * 1000);
});
