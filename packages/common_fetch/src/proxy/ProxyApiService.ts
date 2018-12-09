

/**
 * 代理的服务方法定义
 * @param args,参数列表中最后一个名字为 options的为 BaseFetchOptions的子类
 */
export type ProxyServiceMethod<E = any> = (...args) => Promise<E>;


/**
 * 代理的服务 定义
 */
export interface ProxyApiService {




    /**
     * 服务方法
     */
    // [prop: string]: ServiceMethod<any> | string;
}


