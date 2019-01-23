/**
 * api签名策略
 */
import {FetchOptions} from "../FetchOptions";

export interface ApiSignatureStrategy {

    /**
     * @param args
     * @return 返回签名的参数对象
     */
    sign: (...args) => object
}


export interface SimpleApiSignatureStrategy extends ApiSignatureStrategy {


    /**
     * 签名
     * @param fields        需要参与签名的字段
     * @param data          请求数据
     * @param fetchOptions  请求数据
     */
    sign: (fields: string[], data: object | any, fetchOptions: FetchOptions) => object;


}