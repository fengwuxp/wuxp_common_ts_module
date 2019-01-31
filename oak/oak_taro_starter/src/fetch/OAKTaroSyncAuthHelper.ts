import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";
import {TaroInterface} from "taro_starter/src/TaroJsHolder";
import {AbstractSyncAuthHelper, RefreshTokenResult} from "common_fetch/src/interceptor/default/AbstractSyncAuthHelper";
import {RestTemplate} from "../../../../packages/common_fetch/src/template/RestTemplate";

/**
 * Taro 同步鉴权处理者
 */
export default class OAKTaroSyncAuthHelper extends AbstractSyncAuthHelper {

    private taro: TaroInterface;


    //等待登录结果通知的最大秒数
    public static MAX_WAIT_LOGIN_NOTICE_TIMES = 30 * 1000;


    constructor(testTemplate: RestTemplate, taro: TaroInterface) {
        super(testTemplate);
        this.taro = taro;
    }

    isToAuthView = (response: FetchResponse, options: FetchOptions): Promise<FetchResponse> => {

        if (response.data.code != 99) {
            return Promise.resolve(response);
        }

        return this.buildWaitPromise({
            response,
            options
        });

    };


    protected getToken = (): Promise<string> => {
        return taroDefaultSessionManager.getMember().then((member) => {
            const token = member["token"];
            if (this.verifyToken(token)) {
                return Promise.reject();
            } else {
                return token;
            }
        })
    };

    protected broadcastRefreshTokenEvent = () => {
        this.taro.eventCenter.trigger(AbstractSyncAuthHelper.NEED_AUTH_EVENT);
    };
    protected cancelTokenResultEvent = () => {
        //取消事件监听
        this.taro.eventCenter.off(AbstractSyncAuthHelper.NEED_AUTH_EVENT);
    };

    protected receiveTokenResultEvent = () => {
        //接受事件监听
        this.taro.eventCenter.on(AbstractSyncAuthHelper.REFRESH_TOKEN_RESULT, (result: RefreshTokenResult) => {
            this.handleWaitResult(result);
        });
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


}