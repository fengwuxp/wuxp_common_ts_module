import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import simpleAppSessionManager from "weex_starter/src/session/WeexDefaultSessionManager";
import AppRouter from "weex_starter/src/route/AppRouter";
import {broadcast} from "../ExpotrtWeexOAKModel";

/**
 * weex 同步鉴权helper
 */
export default class OAKWeexSyncAuthHelper implements SyncAuthHelper {

    protected static toLoginStatus: boolean = false;

    protected static loginNoticeTimerId;


    public static LOGIN_EVENT = "login";

    //登录成功事件
    public static LOGIN_SUCCESS_EVENT: string = "success";

    //需要登录事件通知
    public static NEED_LOGIN_EVENT: string = "need";

    async isToAuthView(response: FetchResponse): Promise<FetchResponse> {

        if (response.data.code != 99) {
            return response;
        }
        if (OAKWeexSyncAuthHelper.loginNoticeTimerId != null) {
            //处于等待状态
            return Promise.reject(response);
        }


        return new Promise<FetchResponse>((resolve, reject) => {

            //20秒内没有得到登录成功的通知，则认为失败
            OAKWeexSyncAuthHelper.loginNoticeTimerId = setTimeout(() => {
                this.clearStatus();
                reject(response);
            }, 20000);

            //发出一个需要登录的通知
            broadcast.send(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.NEED_LOGIN_EVENT, null);

            //监听登录成功
            broadcast.register(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.LOGIN_SUCCESS_EVENT, () => {
                //移除定时器
                clearTimeout(OAKWeexSyncAuthHelper.loginNoticeTimerId);
                this.clearStatus();
                resolve(response);
            });

            //跳转到登录页面
            AppRouter.toView({
                pathname: "login"
            });

        });

    };


    async requestParamsEnhance(params: FetchOptions): Promise<FetchOptions> {

        try {
            const member: any = await simpleAppSessionManager.getMember();
            params.headers["token"] = member.token;
        } catch (e) {

            //TODO 加入鉴权判断逻辑

            return params;

        }

        return params;
    };

    private clearStatus = () => {
        //清除定时器
        OAKWeexSyncAuthHelper.loginNoticeTimerId = null;
        //取消事件监听
        broadcast.unregister(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.LOGIN_SUCCESS_EVENT);
    }


}