import {ReqMethod} from "../../constant/ReqMethod";
import {DataType} from "../../constant/DataType";
import {FetchOptions} from "../../FetchOptions";
import {ArgumentsResolver} from "./ArgumentsResolver";


/**
 * 抽象的参数解析者
 */
export default abstract class AbstractArgumentsResolver<T extends FetchOptions> implements ArgumentsResolver<T> {


    /**
     * 解析参数
     * @param url  接口请求url
     * @param data 服务方法的默认返回值，一般是请求借口需要的签名参数
     * @param args 接口请求数据，请求配置等
     */
    resolve = (url: string, ...args): T => {

        //T
        let options: T = Object.assign({
            url,
            useProgressBar: true
        }, args[1]);

        if (AbstractArgumentsResolver.enabledDecorator) {
            const {url, method, dataType, other, serializeType} = data;
            options.method = method;
            options.dataType = dataType;
            options.serializeType = serializeType;
            data = other;
        }


        //请求的数据
        options.data = typeof args[0] === "undefined" ? {} : Object.assign({}, args[0]);

        //请求方法
        options.method = options.method as ReqMethod || ReqMethod.POST;

        //结果数据类型
        options.dataType = options.dataType as DataType || DataType.JSON;

        options.headers = options.headers == null ? {} : options.headers;

        return this.buildOptions(options, data);
    };

    /**
     * 处理代理接口返回的数据
     * @param options 接口请求配置
     * @param data 接口默认返回的数据
     */
    abstract buildOptions: (options: T, data: (string[] | any)) => T;
}