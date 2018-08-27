import SimpleFetchClientBuilder from "../src/builder/SimpleFetchClientBuilder";
import WebFetchAdapter from "../src/adapter/web/WebFetchAdapter";
import CommonEs6PoxyBuilder from "../src/proxy/Es5PoxyServiceFactory";
import FetchInterceptorRegister from "../src/register/FetchInterceptorRegister";
import HttpErrorHandlerRegister from "../src/register/HttpErrorHandlerRegister";
import {HttpErrorHandler} from "../src/error/HttpErrorHandler";
import FetchHttpErrorHandler from "../src/error/FetchHttpErrorHandler";

//注册拦截器
FetchInterceptorRegister.register("", null);

//注册http 错误响应处理者
HttpErrorHandlerRegister.register(401, null);

const builder = new SimpleFetchClientBuilder();

const interceptors = [];
const httpErrorHandler: HttpErrorHandler = new FetchHttpErrorHandler();

FetchInterceptorRegister.forEach((item) => {
    interceptors.push(item)
});

HttpErrorHandlerRegister.forEach((item, httpCode) => {
    httpErrorHandler.addErrorCodeHandler(httpCode, item);
});

//构建fetchClient
const fetchClient = builder.adapter(new WebFetchAdapter())
    .interceptors(interceptors)
    .httpErrorHandler(httpErrorHandler)
    .build();

fetchClient.fetch({} as any).then(() => {

}).catch(() => {

});

//代理
const proxyApiService = CommonEs6PoxyBuilder.factory({
    basePath: "",
    queryMember: () => {
        return null;
    }
}, fetchClient);

// proxyApiService.queryMember()