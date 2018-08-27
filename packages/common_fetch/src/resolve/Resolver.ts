/**
 * 解析者
 */
export interface Resolver<T=any> {


    resolve:(...args)=>T;
}