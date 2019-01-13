/**
 * bean 工厂
 */
export interface BeanFactory {

    /**
     * 通过名称获取Bean
     * @param name
     */
    getBean<T = any>(name: string): T

    /**
     * 通过类型获取Bean
     * @param requiredType
     */
    getBeanByType<T = any>(requiredType: any): T;
}