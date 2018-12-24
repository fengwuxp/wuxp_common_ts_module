import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";

import simpleAppSessionManager from "weex_starter/src/session/WeexDefaultSessionManager";

import AppRouter from "weex_starter/src/route/AppRouter";

export default class OAKWeexSyncAuthHelper implements SyncAuthHelper<any> {

    protected static toLoginStatus: boolean = false;

    async isToAuthView(response: FetchResponse) {

        if (response.data.code != 99) {
            return true;
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

        return false;

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


}