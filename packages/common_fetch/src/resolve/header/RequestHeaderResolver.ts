import {Resolver} from "../Resolver";
import {ProxyApiService} from "../../proxy/ProxyApiService";


/**
 * 请求头的解析
 */
export interface RequestHeaderResolver extends Resolver<HeadersInit> {


    /**
     * 解析url
     * @param apiService  接口服务
     * @param methodName  服务方法名称
     * @param headers     默认的请求头
     * @param data        服务请求数据
     */
    resolve: (apiService: ProxyApiService, methodName: string,headers:HeadersInit, data: object) => HeadersInit;


}