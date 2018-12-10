/**
 * api签名策略
 */
export interface ApiSignatureStrategy {

    /**
     * @param args
     * @return 返回签名的参数对象
     */
    sign: (...args) => object
}


export interface SimpleApiSignatureStrategy extends ApiSignatureStrategy {


    sign: (fields: string[], data: object | any) => object;


}