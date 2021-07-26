import {
    FeignClientExecutorInterceptor,
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

    /**
     * @deprecated
     */
    private static IS_TO_AUTHENTICATION_VIEW: boolean = false;


    protected unifiedFailureToast: UnifiedFailureToast;

    /**
     * jump authentication view
     * @deprecated
     */
    protected toAuthenticationViewHandle: Function;


    constructor(unifiedFailureToast?: UnifiedFailureToast, toAuthenticationViewHandle: Function = function () {
    }) {
        this.unifiedFailureToast = unifiedFailureToast;
        this.toAuthenticationViewHandle = toAuthenticationViewHandle;
    }


    postError = (options: T, response: HttpResponse<any>) => {
        const resp: ApiResp = response.data;
        this.tryUnAuthorizedResp(response, resp);

        if (resp == null) {
            return Promise.reject(response);
        }
        this.tryToast(options, resp.message || response.statusText);
        return Promise.reject(response);
    };


    private tryUnAuthorizedResp = async (response: HttpResponse<any>, resp: ApiResp<any>) => {
        const isUnAuthorized = response.statusCode === HttpStatus.UNAUTHORIZED || resp.code === OakUnifiedRespProcessInterceptor.NEED_AUTHENTICATION;
        if (!isUnAuthorized) {
            return;
        }

        const feignConfiguration = await FeignConfigurationRegistry.getDefaultFeignConfiguration();
        const getAuthenticationBroadcaster = feignConfiguration.getAuthenticationBroadcaster;
        if (getAuthenticationBroadcaster != null) {
            const authenticationBroadcaster = getAuthenticationBroadcaster();
            const authenticationStrategy = feignConfiguration.getAuthenticationStrategy();
            if (authenticationStrategy.clearCache != null) {
                authenticationStrategy.clearCache()
            }
            authenticationBroadcaster.sendUnAuthorizedEvent();
            return;
        }


        if (!OakUnifiedRespProcessInterceptor.IS_TO_AUTHENTICATION_VIEW) {
            OakUnifiedRespProcessInterceptor.IS_TO_AUTHENTICATION_VIEW = true;
            this.toAuthenticationViewHandle();
            setTimeout(() => {
                OakUnifiedRespProcessInterceptor.IS_TO_AUTHENTICATION_VIEW = false
            }, 20 * 1000);
        }
    }

    /**
     *
     * @param options
     * @param response {@see ApiResp}
     */
    postHandle = async <E = any>(options: T, response: any) => {
        if (options.useUnifiedTransformResponse === false || response == null) {
            //不使用统一的响应转换
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



    /**
     * 尝试进行错误提示
     * @param options
     * @param message
     */
    private tryToast = (options: T, message: string) => {
        if (options.useUnifiedToast === false || options.useProgressBar === false) {
            return
        }
        const {unifiedFailureToast} = this;
        if (StringUtils.hasText(message) && typeof unifiedFailureToast === "function") {
            // use failure toast
            unifiedFailureToast(message);
        }
    }

}
