// import {ProxyApiService} from "../proxy/ProxyApiService";
// import {ProxyServiceFactory} from "../proxy/factory/ProxyServiceFactory";
// import {FetchClient} from "../fetch/FetchClient";
// import {buildFetchClient} from "./BuildeFetchClientUtil";
// import {RUN_ENV} from "common_env/src/EnvVariable";
// import {RunEnv} from "common_env/src/enums/RunEnv";
//
//
// //初始化一个fetch client 实例
// const fetchClient: FetchClient = buildFetchClient();
//
// /**
//  * 工具类
//  */
// export default class BuilderProxyServiceUtil {
//
//
//     /**
//      *  build一个代理服务
//      * @param apiService
//      */
//     public static build<T extends ProxyApiService>(apiService: T): T {
//
//         let builder: ProxyServiceFactory;
//         if (RUN_ENV === RunEnv.WEEX) {
//             //weex中需要使用es5的代理
//             builder = require("../proxy/factory/Es5PoxyServiceFactory").default;
//         } else {
//             builder = require("../proxy/factory/Es6PoxyServiceFactory").default;
//         }
//
//
//         return builder.factory(apiService, fetchClient);
//     }
// }