import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";

export default class OAKTaroSyncAuthHelper implements SyncAuthHelper<any> {

    async isToAuthView(data: FetchResponse) {


        if (data.data.code == 99) {


        }

        return true;

    };


    async requestParamsEnhance(params: FetchOptions): Promise<boolean> {

        try {
            // const member: any = await simpleAppSessionManager.getMember();
            // params.data["token"] = member.token;
        } catch (e) {

            //TODO 加入鉴权判断逻辑

            return true;

        }


        return true;

    };


}