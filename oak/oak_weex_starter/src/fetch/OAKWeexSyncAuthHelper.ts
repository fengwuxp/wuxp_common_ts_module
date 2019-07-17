import {FetchOptions, FetchResponse} from "fengwuxp_common_fetch/src/FetchOptions";
import simpleAppSessionManager from "weex_starter/src/session/WeexDefaultSessionManager";
import AppRouter from "weex_starter/src/route/AppRouter";
import {broadcast} from "../ExpotrtWeexOAKModel";
import {AbstractSyncAuthHelper} from "fengwuxp_common_fetch/src/interceptor/default/AbstractSyncAuthHelper";
import {RestTemplate} from "fengwuxp_common_fetch/src/template/RestTemplate";
import {RefreshTokenResult} from "fengwuxp_common_fetch/src/interceptor/default/AbstractSyncAuthHelper";

/**
 * weex 同步鉴权helper
 */
export default class OAKWeexSyncAuthHelper extends AbstractSyncAuthHelper<FetchOptions,FetchResponse> {


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
        broadcast.send(AbstractSyncAuthHelper.NEED_AUTH_EVENT, AbstractSyncAuthHelper.NEED_AUTH_EVENT, true);
    };
    protected cancelTokenResultEvent = () => {
        //取消事件监听
        broadcast.unregister(AbstractSyncAuthHelper.REFRESH_TOKEN_RESULT, AbstractSyncAuthHelper.NEED_AUTH_EVENT);
    };

    protected receiveTokenResultEvent = () => {
        //接受事件监听
        broadcast.register(AbstractSyncAuthHelper.REFRESH_TOKEN_RESULT, AbstractSyncAuthHelper.NEED_AUTH_EVENT, (result: RefreshTokenResult) => {
            this.handleWaitResult(result);
        });
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