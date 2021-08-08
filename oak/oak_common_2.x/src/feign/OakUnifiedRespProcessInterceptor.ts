import {
    FeignClientExecutorInterceptor,
    FeignConfiguration,
    FeignConfigurationRegistry,
    FeignRequestOptions,
    HttpResponse,
    HttpStatus,
    UnifiedFailureToast
} from "fengwuxp-typescript-feign";
import {ApiResp} from "../model/api/ApiResp";
import StringUtils from "fengwuxp-common-utils/lib/string/StringUtils";

export default class OakUnifiedRespProcessInterceptor<T extends FeignRequestOptions = FeignRequestOptions>
    implements FeignClientExecutorInterceptor<T> {

    private static SUCCESS_CODE = 0;

    private static NEED_AUTHENTICATION = 99;

    private static TO_AUTHENTICATION_VIEW_STATE: boolean = false;

    private readonly unifiedFailureToast: UnifiedFailureToast;

    /**
     * jump authentication view
     */
    private readonly toAuthenticationViewHandle: Function;


    constructor(unifiedFailureToast?: UnifiedFailureToast, toAuthenticationViewHandle?: Function) {
        this.unifiedFailureToast = unifiedFailureToast;
        this.toAuthenticationViewHandle = toAuthenticationViewHandle;
    }


    postError = (options: T, response: HttpResponse<ApiResp>) => {
        this.tryHandleUnAuthorizedResp(response);
        if (response.data == null) {
            return Promise.reject(response);
        }
        this.tryToastErrorMessage(options, response);
        return Promise.reject(response);
    };

    /**
     *
     * @param options
     * @param response {@see ApiResp}
     */
    postHandle = async <E = any>(options: T, response: any) => {
        if (options.useUnifiedTransformResponse === false || response == null) {
            // 不使用统一的响应转换
            return response;
        }

        if (response.code !== OakUnifiedRespProcessInterceptor.SUCCESS_CODE) {
            return this.postError(options, {
                statusCode: HttpStatus.OK,
                ok: true,
                data: response
            });
        }

        return response.data;
    };

    private tryHandleUnAuthorizedResp = (response: HttpResponse<ApiResp>) => {
        if (this.isUnAuthorized(response)) {
            this.asyncSendUnAuthorizedEvent();
            this.toAuthenticationViewAndResetState();
        }
    }

    private toAuthenticationViewAndResetState = () => {
        if (!OakUnifiedRespProcessInterceptor.TO_AUTHENTICATION_VIEW_STATE) {
            OakUnifiedRespProcessInterceptor.TO_AUTHENTICATION_VIEW_STATE = true;
            this.toAuthenticationViewHandle();
            setTimeout(() => {
                OakUnifiedRespProcessInterceptor.TO_AUTHENTICATION_VIEW_STATE = false
            }, 20 * 1000);
        }
    }

    private isUnAuthorized = (response: HttpResponse<ApiResp>) => {
        return response.statusCode === HttpStatus.UNAUTHORIZED || response.data?.code === OakUnifiedRespProcessInterceptor.NEED_AUTHENTICATION;
    }

    private asyncSendUnAuthorizedEvent = () => {
        FeignConfigurationRegistry.getDefaultFeignConfiguration().then(this.sendUnAuthorizedEvent)
    }

    private sendUnAuthorizedEvent = (feignConfiguration: FeignConfiguration) => {
        const getAuthenticationStrategy = feignConfiguration.getAuthenticationStrategy;
        if (typeof getAuthenticationStrategy === "function") {
            const authenticationStrategy = getAuthenticationStrategy();
            if (authenticationStrategy.clearCache != null) {
                authenticationStrategy.clearCache()
            }
        }

        const getAuthenticationBroadcaster = feignConfiguration.getAuthenticationBroadcaster;
        if (typeof getAuthenticationBroadcaster === "function") {
            const authenticationBroadcaster = getAuthenticationBroadcaster();
            authenticationBroadcaster.sendUnAuthorizedEvent();
        }
    }


    /**
     * 尝试进行错误提示
     * @param options
     * @param response
     */
    private tryToastErrorMessage = (options: T, response: HttpResponse) => {
        const forceCloseToast = options.useUnifiedToast === false || options.useProgressBar === false;
        if (forceCloseToast) {
            return;
        }
        this.toastErrorMessage(response);
    }

    private toastErrorMessage = (response: HttpResponse) => {
        const {unifiedFailureToast} = this;
        const message = response.data?.message ?? response.statusText;
        if (StringUtils.hasText(message) && typeof unifiedFailureToast === "function") {
            // use failure toast
            unifiedFailureToast(message);
        }
    }
}
