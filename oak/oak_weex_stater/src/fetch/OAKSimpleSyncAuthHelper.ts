import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
//@ts-ignore
import simpleAppSessionManager from "weex_starter/src/session/SimpleAppSessionManager";
//@ts-ignore
import AppRouter from '../../../../src/route/AppRouter';

export default class OAKSimpleSyncAuthHelper implements SyncAuthHelper<any> {

    async isToAuthView(data: FetchResponse) {


        if (data.data.code == 99) {

            //跳转到登录页面
            AppRouter.toView("login");

            return false;
        }

        return true;

    };


    async requestParamsEnhance(params: FetchOptions): Promise<boolean> {

        const member = await simpleAppSessionManager.getMember();

        params.data["token"] = member.token;

        return true;

    };


}