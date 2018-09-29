/**
 * 鉴权管理者
 * @author wxup
 * @create 2018-09-29 16:34
 **/
export interface AuthenticationManager<T> {


    /**
     * 刷新鉴权的token
     * @param args
     */
    refreshToken: (...args) => Promise<T>;


    /**
     * 获取本地的鉴权信息
     */
    getLocalAuth: () => T;

    /**
     * 鉴权是否失效
     */
    isInvalid: () => boolean | Promise<boolean>;
}
