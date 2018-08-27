import {BaseFetchOptions} from "../../BaseFetchOptions";
import {FetchOptions} from "../../fetch/FetchOptions";
import {Resolver} from "../Resolver";

/**
 * 将代理借口的参数进行解析，最终组装为接口请求配置
 */
export interface ArgumentsResolver<T extends BaseFetchOptions = FetchOptions> extends Resolver<T>{

    /**
     * 解析参数
     * @param url  接口请求url
     * @param data 服务方法的默认返回值，一般是请求借口需要的签名参数
     * @param args 接口请求数据，请求配置等
     */
    resolve: (url: string, data: string[] | any, ...args) => T;
}