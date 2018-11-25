import {AuthenticationManager} from "./AuthenticationManager";
import {Authenticator} from "./Authenticator";

/**
 * 抽象的鉴权管理者
 * @author wxup
 * @create 2018-09-29 16:51
 **/
export default abstract class AbstractAuthenticationManager<T> implements AuthenticationManager<T> {

    protected authenticator:Authenticator<T>;


    constructor(authenticator: Authenticator<T>) {
        this.authenticator = authenticator;
    }

    getLocalAuth: () => T;

    isInvalid: () => (boolean | Promise<boolean>);

    refreshToken: (...args) => Promise<T>;



}
