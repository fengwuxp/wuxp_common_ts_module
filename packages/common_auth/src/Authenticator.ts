/**
 * 鉴权者
 * @param T 鉴权信息
 */
export interface Authenticator<T> {


    /**
     * 鉴权
     * @param args
     */
    authorization: (...args) => Promise<T>;
}
