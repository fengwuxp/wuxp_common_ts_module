import {ProxyApiService} from "../../proxy/ProxyApiService";
import {defaultGenerateAnnotationMethodConfig} from "../../proxy/GenerateAnnotationMethodConfig";
import {FeignProxy} from "../../proxy/feign/FeignProxy";

/**
 * 需要自动上传配置
 */
export interface NeedAutoUploadOptions {

    /**
     * 需要上传的字段
     */
    fields: Array<string>;

    /**
     * 上传的rul
     */
    url?: string;
}

/**
 * @param options  需要自动上传
 * @constructor
 */
export function AutoUpload<T extends FeignProxy>(options: NeedAutoUploadOptions): Function {


    /**
     * decorator
     * @param  {T} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (target: T, name: string, descriptor: PropertyDescriptor): T {
        defaultGenerateAnnotationMethodConfig(target, name, {
            autoUploadOptions: options
        });
        return target;

    }
}