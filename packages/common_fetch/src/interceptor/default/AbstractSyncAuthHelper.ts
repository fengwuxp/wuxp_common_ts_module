import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {SyncAuthHelper} from "./NeedAuthInterceptor";
import {RestTemplate} from "../../template/RestTemplate";


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

    //等待请求的队列
    protected waitingQueue: {
        resolve: Function;
        reject: Function;
        response: FetchResponse;
        options: FetchOptions
    }[] = [];

    /**
     * 鉴权后用于重试的 restTemplate
     */
    protected retryTestTemplate: RestTemplate;


    constructor(testTemplate?: RestTemplate) {
        this.retryTestTemplate = testTemplate;
    }

    abstract isToAuthView: (data: R, options: T) => Promise<R>;

    async requestParamsEnhance(params: T): Promise<T> {

        try {
            let token = await this.getToken();
            console.log("token", token);
            (params as FetchOptions).headers["token"] = token;
        } catch (e) {
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
     * 取消token事件监听
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
                console.log("加入等待队列");
                this.addWaitQueue({
                    resolve,
                    reject,
                    ...item
                });
            });
        }
    };


    protected addWaitQueue = (item) => {
        this.waitingQueue.push(item)
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
            console.log(`自动重试请求：${result.retry}`, options,this.retryTestTemplate);
            if (result.retry && this.retryTestTemplate != null) {
                //重试
                resolve(this.retryTestTemplate.fetch(options));
            } else {
                //登录成功
                resolve(response);
            }
        });


        this.clearStatus();
    }


}

