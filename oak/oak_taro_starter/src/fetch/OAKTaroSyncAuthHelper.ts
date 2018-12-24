import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";

/**
 * 同步鉴权处理者
 */
export default class OAKTaroSyncAuthHelper implements SyncAuthHelper<any> {

    private taro: any;

    protected static loginNoticeTimerId;

    //登录成功事件
    public static LOGIN_SUCCESS_EVENT: string = "login_success_notice";

    //需要登录事件通知
    public static NEED_LOGIN_EVENT: string = "login_success_notice";

    constructor(taro: any) {
        this.taro = taro;
    }

    async isToAuthView(data: FetchResponse) {


        if (data.data.code != 99) {
            return true;
        }

        return new Promise<boolean>((resolve, reject) => {
            //发出一个需要登录的通知
            this.taro.eventCenter.trigger(OAKTaroSyncAuthHelper.NEED_LOGIN_EVENT, true);

            //监听登录成功
            this.taro.eventCenter.on(OAKTaroSyncAuthHelper.LOGIN_SUCCESS_EVENT, () => {
                //清除定时器
                clearTimeout(OAKTaroSyncAuthHelper.loginNoticeTimerId);
                //取消事件监听
                this.taro.eventCenter.off(OAKTaroSyncAuthHelper.LOGIN_SUCCESS_EVENT);
                resolve(false);
            });

            //20秒内没有得到登录成功的通知，则认为失败
            OAKTaroSyncAuthHelper.loginNoticeTimerId = setTimeout(() => {
                reject(true);
                //取消事件监听
                this.taro.eventCenter.off(OAKTaroSyncAuthHelper.LOGIN_SUCCESS_EVENT);
            }, 20000);
        });

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