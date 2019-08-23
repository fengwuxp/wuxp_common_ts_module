import {FetchOptions} from "../../FetchOptions";
import {AuthOptions, CookieJar, OAuthOptions} from "request";

/**
 * Node
 */
export interface NodeFetchOptions extends FetchOptions {


    /**
     * cookie
     */
    jar?: CookieJar | boolean;

    auth?: AuthOptions;

    oauth?: OAuthOptions;
}