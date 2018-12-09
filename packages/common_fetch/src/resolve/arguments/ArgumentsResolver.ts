import {BaseFetchOptions} from "../../BaseFetchOptions";
import {FetchOptions} from "../../FetchOptions";
import {Resolver} from "../Resolver";

/**
 * 将代理借口的参数进行解析，最终组装为接口请求配置
 */
export interface ArgumentsResolver<T extends BaseFetchOptions = FetchOptions> extends Resolver<T>{

    /**
     * 解析参数
     * @param url  接口请求url
     * @param args 接口请求数据，请求配置等
     */
    resolve: (url: string, ...args) => T;
}