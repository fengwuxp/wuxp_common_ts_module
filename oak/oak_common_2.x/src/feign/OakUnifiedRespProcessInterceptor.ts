import {
    FeignClientExecutorInterceptor,
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


    private static IS_TO_AUTHENTICATION_VIEW: boolean = false;


    protected unifiedFailureToast: UnifiedFailureToast;

    // jump authentication view
    protected toAuthenticationViewHandle: Function;


    constructor(unifiedFailureToast?: UnifiedFailureToast, toAuthenticationViewHandle: Function = function () {
    }) {
        this.unifiedFailureToast = unifiedFailureToast;
        this.toAuthenticationViewHandle = toAuthenticationViewHandle;
    }


    postError = (options: T, response: HttpResponse<any>) => {
        const resp: ApiResp = response.data;
        if (response.statusCode === HttpStatus.UNAUTHORIZED || resp.code === OakUnifiedRespProcessInterceptor.NEED_AUTHENTICATION) {
            OakUnifiedRespProcessInterceptor.IS_TO_AUTHENTICATION_VIEW = true;
            if (!OakUnifiedRespProcessInterceptor.IS_TO_AUTHENTICATION_VIEW) {
                this.toAuthenticationViewHandle();
                setTimeout(() => {
                    OakUnifiedRespProcessInterceptor.IS_TO_AUTHENTICATION_VIEW = false
                }, 20 * 1000);
            }
        }

        if (resp == null) {
            return Promise.reject(response);
        }
        this.tryToast(options, resp.message || response.statusText);
        return Promise.reject(response);
    };


    postHandle = async <E = any>(options: T, response: any) => {
        if (options.useUnifiedTransformResponse === false || response == null) {
            //不使用统一的响应转换
            return response;
        }
        const resp: ApiResp = response.data;
        if (resp == null) {
            return Promise.reject(response);
        }

        if (resp.code !== OakUnifiedRespProcessInterceptor.SUCCESS_CODE) {
            this.tryToast(options, resp.message || response.statusText);
            return Promise.reject(resp);
        }

        return resp.data;
    };


    /**
     * 尝试进行错误提示
     * @param options
     * @param message
     */
    private tryToast = (options: T, message: string) => {
        if (this.unifiedFailureToast == null) {
            return;
        }
        if (options.useUnifiedToast === false || options.useProgressBar === false) {
            return false;
        }
        if (StringUtils.hasText(message)) {
            // use failure toast
            this.unifiedFailureToast(message);
        }

    }

}
