import {ProxyApiService} from "../proxy/ProxyApiService";
import {ReqMethod} from "../enums/ReqMethod";
import {DataType} from "../enums/DataType";
import {SerializeType} from "../enums/http/SerializeType";


export interface RequestMappingOptions {

    url?: string;

    method?: ReqMethod

    dataType?: DataType,

    /**
     * 请求参数序列化类型
     */
    serializeType?: SerializeType,

    /**
     * 其他参数
     */
    other?: any
}

/**
 * RequestMapping
 * @param options
 * @constructor
 */
export function RequestMapping<T extends ProxyApiService>(options: RequestMappingOptions): Function {

    /**
     * decorator
     * @param  {T} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (target: T, name: string, descriptor: PropertyDescriptor): any {

        target[name] = function () {
            return options;
        };

        return target;

    }
}