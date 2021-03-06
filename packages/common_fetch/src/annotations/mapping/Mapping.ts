import {RequestMethod} from "../../constant/RequestMethod";
import {defaultGenerateAnnotationMethodConfig} from "../../proxy/GenerateAnnotationMethodConfig";
import {HttpMediaType} from "../../constant/http/HttpMediaType";
import {FeignProxy} from "../../proxy/feign/FeignProxy";


export interface BaseRequestMappingOptions {
    /**
     * 请求的uri地址
     * 支持path variable 例如：getMember/{memberId}，表明参数中的memberId将作为路径参数，命名要保持一致
     */
    value?: string;


    /**
     * 自定义请求头，支持2中写法
     * 1：固定值，例如 {myHeader:"1234"}
     * 2：将参数中的某些字段当做请求头，例如：{token:"{token}"}
     */
    headers?: HeadersInit;

    /**
     * 超时时间，
     * 单位：毫秒
     * 默认 10*1000 毫秒
     */
    timeout?: number;


    /**
     * 提交的数据类型
     * @see {@link ../constant/http/MediaType}
     * 默认 MediaType.JSON_UTF8
     */
    consumes?: string[];

    /**
     * 响应的数据类型
     * @see {@link ../constant/http/MediaType}
     * 默认 MediaType.JSON_UTF8
     */
    produces?: string[];

    /**
     * 需要鉴权
     * 默认：false
     */
    needAuth?: boolean;

}

export interface RequestMappingOptions extends BaseRequestMappingOptions {


    /**
     * 请求 method
     */
    method: RequestMethod;


}

//url mapping 类型
export type Mapping<T extends BaseRequestMappingOptions = BaseRequestMappingOptions> = (options: T) => Function;

/**
 * 生成Mapping注解 的方法
 * @param method
 */
export function generateMapping<T extends BaseRequestMappingOptions>(method?: RequestMethod): Mapping<T> {

    return function <E extends FeignProxy>(options: T): Function {


        /**
         * decorator
         * @param  {E} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
         * @param  {string} name                     装饰的属性的 key
         * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
         */
        return function (target: E, name: string, descriptor: PropertyDescriptor): E {

            //通过注解生成feign的代理配置
            const requestMapping: RequestMappingOptions = {
                method,
                ...(options as any)
            };

            if (requestMapping.consumes == null) {
                requestMapping.consumes = [HttpMediaType.APPLICATION_JSON_UTF8]
            }
            if (requestMapping.produces == null) {
                requestMapping.produces = []//[MediaType.JSON_UTF8]
            }
            defaultGenerateAnnotationMethodConfig(target, name, {
                requestMapping
            });

            return target;

        };
    }
}
