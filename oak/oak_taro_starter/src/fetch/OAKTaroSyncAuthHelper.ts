import {FetchOptions, FetchResponse} from "fengwuxp_common_fetch/src/FetchOptions";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";
import {
    AbstractSyncAuthHelper,
    RefreshTokenResult
} from "fengwuxp_common_fetch/src/interceptor/default/AbstractSyncAuthHelper";
import {RestTemplate} from "fengwuxp_common_fetch/src/template/RestTemplate";
import TaroJsHolder, {TaroInterfaceHolder} from "taro_starter/src/TaroJsHolder";

/**
 * Taro 同步鉴权处理者
 */
export default class OAKTaroSyncAuthHelper extends AbstractSyncAuthHelper<FetchOptions, FetchResponse> {


    protected taroHolder: TaroInterfaceHolder;

    protected tokenAttrName: string;

    constructor(testTemplate: RestTemplate,
                authorizationHeaderName?: string,
                tokenAttrName?: string
    ) {
        super(testTemplate, authorizationHeaderName);
        this.tokenAttrName = tokenAttrName || "token";
        this.taroHolder = TaroJsHolder.getTaroHolder();
    }

    isToAuthView = (response: FetchResponse, options: FetchOptions): Promise<FetchResponse> => {

        if (response.data.code != 99) {
            return Promise.resolve(response);
        }

        taroDefaultSessionManager.removeMember();

        return this.buildWaitPromise({
            response,
            options
        });

    };


    protected getToken = (): Promise<string> => {
        return taroDefaultSessionManager.getMember().then((member) => {
            const token = member[this.tokenAttrName];
            if (this.verifyToken(token)) {
                return token;
            } else {
                return Promise.reject();
            }
        })
    };

    protected broadcastRefreshTokenEvent = () => {
        this.taroHolder.taro.eventCenter.trigger(AbstractSyncAuthHelper.NEED_AUTH_EVENT);
    };
    protected cancelTokenResultEvent = () => {
        //取消事件监听
        this.taroHolder.taro.eventCenter.off(AbstractSyncAuthHelper.REFRESH_TOKEN_RESULT);
    };

    protected receiveTokenResultEvent = () => {
        //接受事件监听
        this.taroHolder.taro.eventCenter.on(AbstractSyncAuthHelper.REFRESH_TOKEN_RESULT, (result: RefreshTokenResult) => {
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