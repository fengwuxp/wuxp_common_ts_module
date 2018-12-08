// import {FetchClient} from "../fetch/FetchClient";
// import {FetchInterceptor} from "../interceptor/FetchInterceptor";
// import {HttpErrorHandler} from "../error/HttpErrorHandler";
// import FetchHttpErrorHandler from "../error/FetchHttpErrorHandler";
// import FetchInterceptorRegister from "../register/FetchInterceptorRegister";
// import SimpleFetchClientBuilder from "../builder/SimpleFetchClientBuilder";
// import HttpErrorHandlerRegister from "../register/HttpErrorHandlerRegister";
// import {FetchAdapter} from "../adapter/FetchAdapter";
// import {RUN_ENV} from "common_env/src/EnvVariable";
// import {RunEnv} from "common_env/src/enums/RunEnv";
//
// /**
//  * 获取一个fetch client
//  */
// export const buildFetchClient = (): FetchClient => {
//
//     //拦截器列表
//     const interceptors: FetchInterceptor[] = [];
//
//     //http 请求错误处理者
//     const httpErrorHandler: HttpErrorHandler = new FetchHttpErrorHandler();
//
//     //获取拦截器列表
//     FetchInterceptorRegister.forEach((item) => {
//         interceptors.push(item)
//     });
//
//     //获取http 错误码处理者
//     HttpErrorHandlerRegister.forEach((item, httpCode: number) => {
//         httpErrorHandler.addErrorCodeHandler(httpCode, item);
//     });
//
//     const builder = new SimpleFetchClientBuilder();
//     //构建fetchClient
//     return builder.adapter(buildFetchAdapterByEnv())
//         .interceptors(interceptors)
//         .httpErrorHandler(httpErrorHandler)
//         .build();
// };
//
// /**
//  * 根据环境变量构建 fetch adapter
//  */
// export const buildFetchAdapterByEnv = (): FetchAdapter => {
//     let fetchAdapter;
//     switch (RUN_ENV) {
//         case RunEnv.WEB:
//             fetchAdapter = require("../adapter/web/WebFetchAdapter");
//             break;
//         case RunEnv.WEEX:
//             fetchAdapter = require("../adapter/weex/WeexAdapter");
//             break;
//         case RunEnv.WX_MIN_AAPP:
//             fetchAdapter = require("../adapter/wxminapp/WXMinAppAdapter");
//             break;
//     }
//     // const adapter:FetchAdapter = new fetchAdapter();
//     return new fetchAdapter.default();
// };