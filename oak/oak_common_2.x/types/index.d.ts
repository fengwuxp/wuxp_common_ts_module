import { FeignRequestOptions, FeignClientExecutorInterceptor, UnifiedFailureToast, HttpResponse, HttpRequest, ClientHttpRequestInterceptorInterface, AuthenticationStrategy, AuthenticationToken, SimpleApiSignatureStrategy, UriVariable, FeignRequestBaseOptions } from 'fengwuxp-typescript-feign';

/**
 * 提示类型
 */
declare enum PromptType {
    /**
     * toast
     */
    TOAST = "TOAST",
    /**
     * 通知
     * @type {string}
     */
    NOTICE = "NOTICE",
    /**
     * 警告
     * @type {string}
     */
    ALERT = "ALERT",
    /**
     * 确认
     * @type {string}
     */
    CONFIRM = "CONFIRM"
}

/**
 * 查询类型
 */
declare enum QueryType {
    /**
     * 查询总数
     */
    QUERY_NUM = "QUERY_NUM",
    /**
     * 查询结果集
     */
    QUERY_RESET = "QUERY_RESET",
    /**
     * 查总数和结果集
     */
    QUERY_BOTH = "QUERY_BOTH"
}

/**
 * 提示数据
 */
interface PromptData {
    /**
     * 标题
     */
    title: string;
    /**
     * 提示内容
     */
    content: string;
    /**
     * 提示类型
     */
    type: PromptType;
    /**
     * 按钮配置
     * key  按钮名称
     * value 是否继续（布尔值）
     */
    buttons: object;
}

/**
 * 动作配置
 */
interface Action {
    /**
     * "动作类型，可能是跳转视图或者是执行某个动作
     * 通过前缀来区分动作或者视图
     * view    视图
     * action  操作
     */
    type: string;
    /**
     * 动作的值
     */
    value: string;
    /**
     * 提示数据
     */
    promptData: PromptData;
    /**
     * 动作参数
     */
    params: object;
    /**
     * 动作说明
     */
    desc: string;
}

/**
 * Created by wuxp on 2017/5/4.
 * api请求对象基类
 */
interface ApiReq {
    /**
     * 接入账号
     */
    clientId?: string;
    /**
     * 签名信息
     */
    sign?: string;
    /**
     * 签名时间戳
     */
    timestamp?: string;
    /**
     * 渠道编号
     * @type {string}
     */
    channelCode?: string;
}

/**
 * 查询请求对象
 */
interface ApiQueryReq extends ApiReq {
    /**
     * 查询类型
     */
    queryType?: string;
    /**
     * 查询页码
     */
    queryPage?: number;
    /**
     * 查询大小
     */
    querySize?: number;
    /**
     * 排序字段
     */
    orderBy?: Array<string>;
    /**
     * 排序类型，\"asc\"升序，\"desc\"降序，必须与orderBy一一对应
     */
    orderType?: Array<string>;
    /**
     * 是否使用缓存
     */
    fromCache?: boolean;
    /**
     *总数
     */
    total?: number;
}

/**
 * Created by wuxp on 2017/5/4.
 * 统一响应对象
 */
interface ApiResp<T = any> {
    /**
     * 请求结果code 0表示成功，其他均为失败
     */
    readonly code: number;
    /**
     * 请求结果 消息
     */
    readonly message: string;
    /**
     * 消息详情，一般用于描述异常信息
     */
    readonly detailMessage: string;
    /**
     * 请求结果数据
     */
    readonly data: T;
    /**
     * 请求是否成功
     */
    readonly success: boolean;
    /**
     * 请求结果动作配置描述
     */
    readonly actions: Action[];
}

interface PageInfo<T = any> {
    readonly total: number;
    readonly records: Array<T>;
    readonly queryType: QueryType;
    readonly queryPage: number;
    readonly querySize: number;
}

/**
 * Created by wuxp on 2017/5/4.
 * 统一查询响应对象
 */
interface ApiQueryResp<T = any> extends ApiResp<PageInfo<T>> {
    /**
     * 请求结果列表的第一个元素
     */
    readonly one: T;
    /**
     * 请求结果列表是否为空
     */
    readonly notEmpty: boolean;
}

declare class OakUnifiedRespProcessInterceptor<T extends FeignRequestOptions = FeignRequestOptions> implements FeignClientExecutorInterceptor<T> {
    private static SUCCESS_CODE;
    private static NEED_AUTHENTICATION;
    /**
     * @deprecated
     */
    private static IS_TO_AUTHENTICATION_VIEW;
    protected unifiedFailureToast: UnifiedFailureToast;
    /**
     * jump authentication view
     * @deprecated
     */
    protected toAuthenticationViewHandle: Function;
    constructor(unifiedFailureToast?: UnifiedFailureToast, toAuthenticationViewHandle?: Function);
    postError: (options: T, response: HttpResponse<any>) => Promise<never>;
    private tryUnAuthorizedResp;
    /**
     *
     * @param options
     * @param response {@see ApiResp}
     */
    postHandle: <E = any>(options: T, response: any) => Promise<any>;
    /**
     * 尝试进行错误提示
     * @param options
     * @param message
     */
    private tryToast;
}

/**
 *  oak Authentication client http request interceptor
 *
 *  Support blocking 'authorization' refresh
 */
declare class OakAuthenticationClientHttpRequestInterceptor<T extends HttpRequest = HttpRequest> implements ClientHttpRequestInterceptorInterface<T> {
    protected static IS_REFRESH_TOKEN_ING: boolean;
    protected static WAITING_QUEUE: Array<{
        resolve: (value?: any | PromiseLike<any>) => void;
        reject: (reason?: any) => void;
        request: HttpRequest;
    }>;
    protected static EXPIRED_MARK: number;
    private aheadOfTimes;
    private authenticationStrategy;
    private blockingRefreshAuthorization;
    private looseMode;
    /**
     *
     * @param authenticationStrategy
     * @param aheadOfTimes                default: 5 * 60 * 1000
     * @param blockingRefreshAuthorization
     * @param looseMode                   default: true
     */
    constructor(authenticationStrategy: AuthenticationStrategy, aheadOfTimes?: number, blockingRefreshAuthorization?: boolean, looseMode?: boolean);
    interceptor: (req: T) => Promise<T>;
    /**
     * append authorization header
     * @param authorization
     * @param headers
     */
    private appendAuthorizationHeader;
    /**
     * need append authorization header
     * @param headers
     */
    private needAppendAuthorizationHeader;
    setAuthenticationStrategy: (authenticationStrategy: AuthenticationStrategy<AuthenticationToken>) => void;
}

/**
 * oak的api签名策略
 */
declare class OAKApiSignatureStrategy implements SimpleApiSignatureStrategy {
    /**
     * 客户端id
     */
    private appId;
    /**
     * 签名秘钥
     */
    private appSecret;
    /**
     * 渠道编号
     */
    private channelCode;
    /**
     * 支持使用body上传签名数据
     */
    private supportBody;
    constructor(appId: string, appSecret: string, channelCode: string, supportBody?: boolean);
    sign: (fields: string[], data: UriVariable, feignRequestBaseOptions: FeignRequestBaseOptions) => void;
}

/**
 * oak的api签名策略
 * @since 1.0
 */
declare class OAKApiSignatureStrategyVersion1 implements SimpleApiSignatureStrategy {
    /**
     * 客户端id
     */
    private clientId;
    /**
     * 签名秘钥
     */
    private clientSecret;
    /**
     * 渠道编号
     */
    private channelCode;
    constructor(clientId: string, clientSecret: string, channelCode: string);
    sign: (fields: string[], data: UriVariable, feignRequestBaseOptions: FeignRequestBaseOptions) => void;
}

export { Action, ApiQueryReq, ApiQueryResp, ApiReq, ApiResp, OAKApiSignatureStrategyVersion1, OAKApiSignatureStrategy as OakApiSignatureStrategy, OakAuthenticationClientHttpRequestInterceptor, OakUnifiedRespProcessInterceptor, PageInfo, PromptData, PromptType, QueryType };
