import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";
import {TaroInterface} from "taro_starter/src/TaroJsHolder";
import {broadcast} from "../../../oak_weex_starter/src/ExpotrtWeexOAKModel";

/**
 * 同步鉴权处理者
 */
export default class OAKTaroSyncAuthHelper implements SyncAuthHelper<any> {

    private taro: TaroInterface;

    protected static loginNoticeTimerId;

    //登录成功事件
    public static LOGIN_SUCCESS_EVENT: string = "login_success_notice";

    //需要登录事件通知
    public static NEED_LOGIN_EVENT: string = "need_login_notice";

    constructor(taro: TaroInterface) {
        this.taro = taro;
    }

    async isToAuthView(data: FetchResponse) {

        if (data.data.code != 99) {
            return true;
        }

        if (OAKTaroSyncAuthHelper.loginNoticeTimerId != null) {
            //处于等待状态
            return Promise.reject(false);
        }

        return new Promise<boolean>((resolve, reject) => {

            //20秒内没有得到登录成功的通知，则认为失败
            OAKTaroSyncAuthHelper.loginNoticeTimerId = setTimeout(() => {
                this.clearStatus();
                reject(true);
            }, 20000);

            //发出一个需要登录的通知
            this.taro.eventCenter.trigger(OAKTaroSyncAuthHelper.NEED_LOGIN_EVENT, true);

            //监听登录成功
            this.taro.eventCenter.on(OAKTaroSyncAuthHelper.LOGIN_SUCCESS_EVENT, () => {
                //清除定时器
                clearTimeout(OAKTaroSyncAuthHelper.loginNoticeTimerId);
                this.clearStatus();
                resolve(false);
            });

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

    private clearStatus = () => {
        //清除定时器
        OAKTaroSyncAuthHelper.loginNoticeTimerId = null;
        //取消事件监听
        this.taro.eventCenter.off(OAKTaroSyncAuthHelper.LOGIN_SUCCESS_EVENT);
    }


}