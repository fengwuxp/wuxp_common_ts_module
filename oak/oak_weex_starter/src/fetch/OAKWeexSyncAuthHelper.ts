import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import simpleAppSessionManager from "weex_starter/src/session/WeexDefaultSessionManager";
import AppRouter from "weex_starter/src/route/AppRouter";
import {broadcast} from "../ExpotrtWeexOAKModel";

/**
 * weex 同步鉴权helper
 */
export default class OAKWeexSyncAuthHelper implements SyncAuthHelper {


    protected static loginNoticeTimerId;

    public static LOGIN_EVENT = "login";

    //等待登录结果通知的最大毫秒数
    public static MAX_WAIT_LOGIN_NOTICE_TIMES = 30 * 1000;

    //登录结果事件
    public static LOGIN_SUCCESS_EVENT: string = "result_notice";

    //需要登录事件通知
    public static NEED_LOGIN_EVENT: string = "need_login";

    async isToAuthView(response: FetchResponse, options: FetchOptions): Promise<FetchResponse> {

        if (response.data.code != 99) {
            return response;
        }
        if (OAKWeexSyncAuthHelper.loginNoticeTimerId != null) {
            //处于等待状态
            return response;
        }


        return new Promise<FetchResponse>((resolve, reject) => {

            //发出一个需要登录的通知
            broadcast.send(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.NEED_LOGIN_EVENT, null);

            //开始等待通知结果
            this.startWaitLoginResult();

            //跳转到登录页面
            AppRouter.toView({
                pathname: "login"
            });

            resolve(response);
        });

    };


    async requestParamsEnhance(params: FetchOptions): Promise<FetchOptions> {

        try {
            const member: any = await simpleAppSessionManager.getMember();
            const token = member.token;
            if (!this.verifyToken(token)) {
                return params;
            }
            params.headers["token"] = token;
        } catch (e) {

            //TODO 加入鉴权判断逻辑
            return params;

        }

        return params;
    };


    /**
     * 简单验证token有效性
     * @param token
     */
    private verifyToken = (token: string): boolean => {
        if (token == null) {
            return false;
        }

        if (token.length < 10) {
            return false;
        }
        return true;
    };

    /**
     * 开始等待登录结果，最大等待 MAX_WAIT_LOGIN_NOTICE_TIMES 时长
     */
    private startWaitLoginResult = () => {

        //初始化定时器
        OAKWeexSyncAuthHelper.loginNoticeTimerId = setTimeout(() => {
            this.clearStatus();
        }, OAKWeexSyncAuthHelper.MAX_WAIT_LOGIN_NOTICE_TIMES);

        //监听登录结果，不论成功或失败
        broadcast.register(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.LOGIN_SUCCESS_EVENT, () => {
            //移除定时器
            clearTimeout(OAKWeexSyncAuthHelper.loginNoticeTimerId);
            this.clearStatus();

        });
    };

    /**
     * 清除状态
     */
    private clearStatus = () => {
        //清除定时器
        OAKWeexSyncAuthHelper.loginNoticeTimerId = null;

        //取消事件监听
        broadcast.unregister(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.LOGIN_SUCCESS_EVENT);
    }


}