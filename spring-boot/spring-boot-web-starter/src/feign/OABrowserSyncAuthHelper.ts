import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";

import {AbstractSyncAuthHelper} from "common_fetch/src/interceptor/default/AbstractSyncAuthHelper";
import {RestTemplate} from "common_fetch/src/template/RestTemplate";
import {RefreshTokenResult} from "common_fetch/src/interceptor/default/AbstractSyncAuthHelper";

/**
 * broswer 同步鉴权helper
 */
export default class OABrowserSyncAuthHelper extends AbstractSyncAuthHelper {


    constructor(testTemplate?: RestTemplate) {
        super(testTemplate);
    }

    isToAuthView = (response: FetchResponse, options: FetchOptions): Promise<FetchResponse> => {

        if (response.data.code != 99) {
            return Promise.resolve(response);
        }
        //移除本地的用户信息
        simpleAppSessionManager.removeMember();
        if (AbstractSyncAuthHelper.REFRESH_TOKEN_TIMER_ID == null) {
            AppRouter.toView({
                pathname: "login"
            });
        }
        return this.buildWaitPromise({
            response,
            options
        });

    };


    protected getToken = (): Promise<string> => {
        return simpleAppSessionManager.getMember().then((member) => {
            const token = member["token"];
            if (this.verifyToken(token)) {
                return token;
            } else {
                return Promise.reject();
            }
        })
    };

    protected broadcastRefreshTokenEvent = () => {

    };
    protected cancelTokenResultEvent = () => {

    };

    protected receiveTokenResultEvent = () => {

    };


    /**
     * 简单验证token有效性
     * @param token
     */
    private verifyToken = (token: string): boolean => {
        if (token == null) {
            return false;
        }

        if (token.toString().trim().length < 10) {
            return false;
        }
        return true;
    };

}