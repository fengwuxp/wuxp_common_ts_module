import {Authenticator} from "common_auth/src/Authenticator";


/**
 * app 路由鉴权处理者
 */
export interface AppRouterAuthenticator<T> extends Authenticator<T> {


    /**
     * 是否已经鉴权
     */
    isAuthenticated: () => boolean;
}