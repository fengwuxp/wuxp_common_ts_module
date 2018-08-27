/**
 * 注册表
 */
export interface Registry<T> {

    /**
     * 注册
     */
    register: (...args) => any;


    /**
     * 获取
     * @param args
     */
    get: (...args) => T
}