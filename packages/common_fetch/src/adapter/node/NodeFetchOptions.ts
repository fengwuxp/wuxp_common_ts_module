import {FetchOptions} from "../../FetchOptions";
import {CookieJar} from "request";

/**
 * Node
 */
export interface NodeFetchOptions extends FetchOptions {


    /**
     * cookie
     */
    jar?: CookieJar | boolean;
}