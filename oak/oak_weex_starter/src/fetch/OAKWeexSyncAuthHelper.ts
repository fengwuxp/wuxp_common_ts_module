import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import simpleAppSessionManager from "weex_starter/src/session/WeexDefaultSessionManager";
import AppRouter from "weex_starter/src/route/AppRouter";
import {broadcast} from "../ExpotrtWeexOAKModel";


export default class OAKWeexSyncAuthHelper implements SyncAuthHelper<any> {

    protected static toLoginStatus: boolean = false;

    protected static loginNoticeTimerId;


    public static LOGIN_EVENT = "login";

    //登录成功事件
    public static LOGIN_SUCCESS_EVENT: string = "success";

    //需要登录事件通知
    public static NEED_LOGIN_EVENT: string = "need";

    async isToAuthView(response: FetchResponse) {

        if (response.data.code != 99) {
            return true;
        }
        if (OAKWeexSyncAuthHelper.loginNoticeTimerId != null) {
            //处于等待状态
            return Promise.reject(false);
        }

        if (OAKWeexSyncAuthHelper.toLoginStatus === false) {
            OAKWeexSyncAuthHelper.toLoginStatus = true;
            //跳转到登录页面
            AppRouter.toView({
                pathname: "login"
            });
            //5秒内只跳转一次到登录页面
            setTimeout(() => {
                OAKWeexSyncAuthHelper.toLoginStatus = false;
            }, 5000);
        }

        return new Promise<boolean>((resolve, reject) => {

            //20秒内没有得到登录成功的通知，则认为失败
            OAKWeexSyncAuthHelper.loginNoticeTimerId = setTimeout(() => {
                this.clearStatus();
                reject(true);
            }, 20000);

            //发出一个需要登录的通知
            broadcast.send(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.NEED_LOGIN_EVENT, null);

            //监听登录成功
            broadcast.register(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.LOGIN_SUCCESS_EVENT, () => {
                //移除定时器
                clearTimeout(OAKWeexSyncAuthHelper.loginNoticeTimerId);
                this.clearStatus();
                resolve(false);
            });

        });

    };


    async requestParamsEnhance(params: FetchOptions): Promise<boolean> {

        try {
            const member: any = await simpleAppSessionManager.getMember();
            params.data["token"] = member.token;
        } catch (e) {

            //TODO 加入鉴权判断逻辑

            return true;

        }

        return true;
    };

    private clearStatus = () => {
        //清除定时器
        OAKWeexSyncAuthHelper.loginNoticeTimerId = null;
        //取消事件监听
        broadcast.unregister(OAKWeexSyncAuthHelper.LOGIN_EVENT, OAKWeexSyncAuthHelper.LOGIN_SUCCESS_EVENT);
    }


}