import {Scope} from "./enums/Scope";

export interface BeanDefinition<T=any> {


    getBean: () => T;

    getScope: () => Scope;


}