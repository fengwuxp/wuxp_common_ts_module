import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";

/**
 * 同步鉴权处理者
 */
export default class OAKTaroSyncAuthHelper implements SyncAuthHelper<any> {

    private taro: any;

    protected static noticeStatus: boolean = false;

    constructor(taro: any) {
        this.taro = taro;
    }

    async isToAuthView(data: FetchResponse) {


        if (data.data.code != 99) {
            return false;
        }
        if (OAKTaroSyncAuthHelper.noticeStatus === false) {
            OAKTaroSyncAuthHelper.noticeStatus = true;
            //发出一个需要登录的通知
            this.taro.eventCenter.trigger("need_login_notice", true);
            //5秒内只发送一次登录通知
            setTimeout(() => {
                OAKTaroSyncAuthHelper.noticeStatus = false;
            }, 5000);
        }
        return false;

    };


    async requestParamsEnhance(params: FetchOptions): Promise<boolean> {

        try {
            const member: any = await taroDefaultSessionManager.getMember();
            params.data["token"] = member.token;
        } catch (e) {
            //TODO 加入鉴权判断逻辑
            return true;
        }


        return true;

    };


}