import {SyncAuthHelper} from "common_fetch/src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";
import {TaroInterface} from "taro_starter/src/TaroJsHolder";

/**
 * Taro 同步鉴权处理者
 */
export default class OAKTaroSyncAuthHelper implements SyncAuthHelper {

    private taro: TaroInterface;

    protected static loginNoticeTimerId;

    //等待登录结果通知的最大秒数
    public static MAX_WAIT_LOGIN_NOTICE_TIMES = 30 * 1000;

    //登录结果通
    public static LOGIN_RESULT_EVENT: string = "login_result_notice";

    //需要登录事件通知
    public static NEED_LOGIN_EVENT: string = "need_login_notice";

    constructor(taro: TaroInterface) {
        this.taro = taro;
    }

    async isToAuthView(response: FetchResponse, options: FetchOptions): Promise<FetchResponse> {

        if (response.data.code != 99) {
            return response;
        }

        if (OAKTaroSyncAuthHelper.loginNoticeTimerId != null) {
            //处于等待状态
            return response;
        }

        return new Promise<FetchResponse>((resolve, reject) => {

            //发出一个需要登录的通知
            this.taro.eventCenter.trigger(OAKTaroSyncAuthHelper.NEED_LOGIN_EVENT, true);

            //开始等待登录结果
            this.startWaitLoginResult();

            resolve(response);
        });

    };


    async requestParamsEnhance(params: FetchOptions): Promise<FetchOptions> {

        try {
            const member: any = await taroDefaultSessionManager.getMember();
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

        if (token.toString().trim().length < 10) {
            return false;
        }
        return true;
    };

    /**
     * 开始等待登录结果，最大等待 MAX_WAIT_LOGIN_NOTICE_TIMES 时长
     */
    private startWaitLoginResult = () => {

        //初始化定时器
        OAKTaroSyncAuthHelper.loginNoticeTimerId = setTimeout(() => {
            this.clearStatus();
        }, OAKTaroSyncAuthHelper.MAX_WAIT_LOGIN_NOTICE_TIMES);


        //监听登录结果，不论成功或失败
        this.taro.eventCenter.on(OAKTaroSyncAuthHelper.LOGIN_RESULT_EVENT, () => {
            //清除定时器
            clearTimeout(OAKTaroSyncAuthHelper.loginNoticeTimerId);
            this.clearStatus();

        });

    };


    /**
     * 清除状态
     */
    private clearStatus = () => {
        //清除定时器
        OAKTaroSyncAuthHelper.loginNoticeTimerId = null;

        //取消事件监听
        this.taro.eventCenter.off(OAKTaroSyncAuthHelper.LOGIN_RESULT_EVENT);
    }


}