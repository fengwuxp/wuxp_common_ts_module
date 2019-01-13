interface AutowiredOptions {


    /**
     * 指定依赖注入bean的名称，如果有指定，则按照名称注入
     */
    name?: string;

    /**
     * 是否必须
     */
    required?: boolean;
}

/**
 * 自动注入
 * @constructor
 */
export function Autowired<E>(options?: AutowiredOptions): any {


    /**
     * decorator
     * @param  {E} target                        装饰的属性所属的类的原型，注意，不是实例后的类。如果装饰的是 T 的某个属性，这个 target 的值就是 T.prototype
     * @param  {string} name                     装饰的属性的 key 名称
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function (target: E, name: string, descriptor: PropertyDescriptor): E {

        //TODO 返回一个代理对象
        // target[name]=new Proxy()

        return null;

    };
}