import {BeanDefinition} from "./BeanDefinition";
import {Scope} from "./enums/Scope";


export default class AnnotatedBeanDefinition<T = any> implements BeanDefinition<T> {

    private beanScope: Scope;


    constructor(factory: () => T, beanScope: Scope) {
        this.beanScope = beanScope;
        this.getBean = factory;
    }

    getBean: () => T;


    getScope = () => this.beanScope;


}