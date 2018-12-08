import {ProxyApiService} from "../../proxy/ProxyApiService";

/**
 * 签名配置
 */
export interface SignatureOptions {

    /**
     * 要签名的字段名称
     */
    fields: Array<string>;
}


/**
 * 签名配置
 * @param options
 * @constructor
 */
export function Signature<T extends ProxyApiService>(options: SignatureOptions):any {


    /**
     * decorator
     * @param  {T} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (target: T, name: string, descriptor: PropertyDescriptor): any {

        if (typeof target[name] === "function") {

        }


        return target;

    }
}