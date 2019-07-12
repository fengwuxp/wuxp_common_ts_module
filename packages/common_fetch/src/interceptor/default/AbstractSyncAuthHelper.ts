import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {SyncAuthHelper} from "./NeedAuthInterceptor";
import {RestTemplate} from "../../template/RestTemplate";
import {MediaType} from "../../constant/http/MediaType";
import {parse} from "querystring";
import StringUtils from "../../../../common_utils/lib/string/StringUtils";


export interface RefreshTokenResult {

    /**
     * 是否刷新成功
     */
    success: boolean,

    //是否需要重试
    retry?: boolean
}


/**
 * 抽象的实现
 */
export abstract class AbstractSyncAuthHelper<T = FetchOptions, R = FetchResponse> implements SyncAuthHelper<T, R> {


    protected static REFRESH_TOKEN_TIMER_ID;

    /**
     * 发送需要鉴权的广播
     */
    public static NEED_AUTH_EVENT: string = "NEED_AUTH_EVENT";


    /**
     * 接收token刷新的结果
     */
    public static REFRESH_TOKEN_RESULT: string = "REFRESH_TOKEN_RESULT";

    //等待登录结果通知的最大秒数
    public static MAX_WAIT_LOGIN_NOTICE_TIMES = 30 * 1000;

    private static MAX_QUEUE_SIZE = 10;

    //等待请求的队列
    protected waitingQueue: {
        resolve: <T = any>(value?: T | PromiseLike<T>) => void;
        reject: (reason?: any) => void;
        response: FetchResponse;
        options: FetchOptions
    }[] = [];


    /**
     * 加入鉴权的token 名称
     * 默认 token
     */
    private authorizationHeaderName: string;


    /**
     * 鉴权后用于重试的 restTemplate
     */
    protected retryTestTemplate: RestTemplate;


    constructor(testTemplate?: RestTemplate, authorizationHeaderName?: string) {
        this.retryTestTemplate = testTemplate;
        this.authorizationHeaderName = authorizationHeaderName || "token";
    }

    abstract isToAuthView: (data: R, options: T) => Promise<R>;

    async requestParamsEnhance(params: T): Promise<T> {

        let authorizationHeaderValue: string = (params as FetchOptions).headers[this.authorizationHeaderName];
        if (StringUtils.hasText(authorizationHeaderValue)) {
            //如果默认有传鉴权字段，则不再处理
            return params;
        }

        try {
            authorizationHeaderValue = await this.getToken();
            // console.log("token", token);
            (params as FetchOptions).headers[this.authorizationHeaderName] = authorizationHeaderValue;
        } catch (e) {
            console.log("获取token失败", e);
            //获取本地用户信息失败 登录
            if ((params as FetchOptions).needAuth === true) {
                console.log("需要鉴权加入等待鉴权队列", params);
                return this.buildWaitPromise({
                    options: params,
                    response: null
                });
            }
            return params;
        }

        return params;

    };


    protected abstract getToken: () => Promise<string>;


    /**
     * 发送刷新token的事件
     */
    protected abstract broadcastRefreshTokenEvent: () => void;

    /**
     * 接收刷新token的事件
     */
    protected abstract receiveTokenResultEvent: () => void;


    /**
     * 取消token结果事件监听
     */
    protected abstract cancelTokenResultEvent: () => void;


    protected buildWaitPromise = (item: {
        response, options
    }): Promise<any> => {
        if (AbstractSyncAuthHelper.REFRESH_TOKEN_TIMER_ID == null) {
            return new Promise<T>((resolve, reject) => {
                console.log("发出一个需要刷新token的广播");
                //发出一个需要登录的通知
                this.broadcastRefreshTokenEvent();
                //开始等待登录结果
                this.startWaitLoginResult();
                this.addWaitQueue({
                    resolve,
                    reject,
                    ...item
                });
            });
        } else {
            //处于等待状态登录状态
            return new Promise((resolve, reject) => {
                //缓存本次请求的实例
                console.log("加入刷新token的等待队列");
                const r = this.addWaitQueue({
                    resolve,
                    reject,
                    ...item
                });
                if (!r) {
                    reject();
                }
            });
        }
    };


    protected addWaitQueue = (item) => {
        const length = this.waitingQueue.length;
        if (length >= AbstractSyncAuthHelper.MAX_QUEUE_SIZE) {
            console.info("token 刷新等待队列已满，size =", length);
            return false;

        }
        this.waitingQueue.push(item);
        return true;
    };

    /**
     * 开始等待登录结果，最大等待 MAX_WAIT_LOGIN_NOTICE_TIMES 时长
     */
    protected startWaitLoginResult = () => {

        //初始化定时器
        AbstractSyncAuthHelper.REFRESH_TOKEN_TIMER_ID = setTimeout(() => {
            this.handleWaitResult({
                success: false
            });
            this.clearStatus();
        }, AbstractSyncAuthHelper.MAX_WAIT_LOGIN_NOTICE_TIMES);


        this.receiveTokenResultEvent();
    };


    /**
     * 清除状态
     */
    protected clearStatus = () => {
        //清除定时器
        AbstractSyncAuthHelper.REFRESH_TOKEN_TIMER_ID = null;

        //取消事件监听
        this.cancelTokenResultEvent();

        //清空等队列
        this.waitingQueue = [];
    };

    /**
     * 处理登录等待结果
     * @param result
     */
    protected handleWaitResult = (result: RefreshTokenResult) => {
        this.waitingQueue.forEach(({resolve, reject, options, response}) => {
            if (!result.success) {
                reject();
                return;
            }
            // console.log(`自动重试请求：${result.retry}`, options, this.retryTestTemplate);
            if (result.retry && this.retryTestTemplate != null) {
                //重试
                const {contentType} = options;
                if (typeof options.data === "string") {
                    if (contentType === MediaType.FORM_DATA) {
                        options.data = parse(options.data);
                    } else if (contentType === MediaType.JSON_UTF8) {
                        options.data = JSON.parse(options.data);
                    }
                }
                //重试请求
                this.retryTestTemplate.fetch({
                    ...options,
                    //不使用同一的数据转换
                    useUnifiedTransformResponse: false
                }).finally(resolve);
            } else {
                //登录成功,不进行重试，直接把之前的响应,传递下去
                resolve(response);
            }
        });


        this.clearStatus();
    }


}

