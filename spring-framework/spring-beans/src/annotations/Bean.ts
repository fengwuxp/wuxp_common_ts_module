import {Scope} from "../enums/Scope";
import {BeanDefinition} from "../BeanDefinition";
import {BeanType} from "../BeanType";
import AnnotatedBeanDefinition from "../AnnotatedBeanDefinition";
import {registerBeanDefinition} from "../context/BeanContext";

export interface BeanOptions {

    /**
     * bean name = `${BeanType}:${name}`
     */
    name?: string;

    /**
     * 默认：Scope.singleton
     */
    scope?: Scope;

    /**
     * static method
     */
    initMethod?: string;

    /**
     * static method
     */
    destroyMethod?: string;
}

const CONFIGURATION_MAP: Map<any, any> = new Map<any, any>();

/**
 *  Indicates that a method produces a bean to be managed by the Spring container.
 * @constructor
 */
export const Bean = (options?: BeanOptions): Function => {


    const beanOptions: BeanOptions = {
        scope: Scope.singleton,
        ...(options || {})
    };

    return (target: { new(...args: any[]): {} }, name, descriptor: PropertyDescriptor) => {

        const {scope} = beanOptions;

        let beanDefinition: BeanDefinition;

        const constructor = target.constructor;
        let _target = CONFIGURATION_MAP.get(constructor);

        if (_target == null) {
            _target = new constructor();
            CONFIGURATION_MAP.set(constructor, _target);
        }

        const targetElement = _target[name];
        if (scope === Scope.singleton) {
            const bean = targetElement();
            beanDefinition = new AnnotatedBeanDefinition(() => bean, scope);
        } else {
            beanDefinition = new AnnotatedBeanDefinition(targetElement, scope);
        }

        registerBeanDefinition(BeanType.create(name), beanDefinition);

    }
};