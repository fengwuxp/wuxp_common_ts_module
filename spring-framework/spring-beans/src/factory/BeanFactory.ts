/**
 * The root interface for accessing a Spring bean container.
 * This is the basic client view of a bean container;
 */
export interface BeanFactory {

    /**
     * 通过名称获取 bean
     * @param name bean name
     */
    getBean: <T = any>(name: string) => T;

    /**
     *
     * @param name      bean name
     * @param beanType  bean type
     */
    getBean: <T = any>(name: string, beanType: any) => T;

    /**
     *
     * @param beanType bean type
     */
    getBean: <T = any>(beanType: any) => T;
}



