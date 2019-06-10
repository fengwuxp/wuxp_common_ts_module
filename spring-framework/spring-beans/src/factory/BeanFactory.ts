import {BeanType} from "../BeanType";

/**
 * The root interface for accessing a Spring bean container.
 * This is the basic client view of a bean container;
 */
export interface BeanFactory {

    /**
     * 通过名称获取 bean
     * @param name bean name
     */
    getBean: <T = any>(name: string|BeanType) => T;

}



