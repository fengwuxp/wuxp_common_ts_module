import BrowserLocalStorage from "fengwuxp_common_utils/src/storage/browser/BrowserLocalStorage";
import {AppSessionManager} from "fengwuxp_common_auth/src/session/AppSessionManager";
import {AppRouterAuthenticator} from "../../../../spring-framework/spring-react/src/route/AppRouterAuthenticator";


export default class SessionManager<T = any> implements AppSessionManager<T>,AppRouterAuthenticator<T> {

}

