import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";

import simpleAppSessionManager from "weex_starter/src/session/SimpleAppSessionManager";

import AppRouter from "weex_starter/src/route/AppRouter";

export default class OAKWeexSyncAuthHelper implements SyncAuthHelper<any> {

    async isToAuthView(data: FetchResponse) {


        if (data.data.code == 99) {

            //跳转到登录页面
            AppRouter.toView({
                pathname: "login"
            });

            return false;
        }

        return true;

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