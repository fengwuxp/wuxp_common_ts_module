import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import {ApiResp} from "oak_weex_common/src/model/api/ApiResp";
import StringUtils from "common_utils/src/string/StringUtils";
import {TaroInterface} from "taro_starter/src/TaroJsHolder";


/**
 * 统一数据处理
 */
export default class TaroUnifiedRespProcessInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    private taro: TaroInterface;

    private toastImageUrl: string;

    constructor(taro: TaroInterface, toastImageUrl?: string) {
        super();
        this.taro = taro;
        this.toastImageUrl = toastImageUrl;
    }


    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {


        const resp: ApiResp = data.data;

        if (resp.code !== 0) {

            const message = resp.message;
            //加入错误提示
            const useUnifiedToast = StringUtils.hasText(message) && (options.useUnifiedToast !== false || options.useProgressBar !== false);
            if (useUnifiedToast) {
                //使用统一提示
                const config: any = {
                    title: message,
                    mask: true,
                    duration: 2000
                };
                if (this.toastImageUrl) {
                    config.image = this.toastImageUrl;
                } else {
                    config.icon = "none";
                }
                this.taro.showToast(config);
            }


            return Promise.reject(resp);
        }
        if (options.useUnifiedTransformResponse == false) {
            //不使用统一的响应转换
            return data;
        }

        const transformResponse = options.transformResponse;

        //设置默认的响应数据转换
        options.transformResponse = (response: FetchResponse) => {
            let result = null;
            if (typeof transformResponse == "function") {
                //将原始响应传递给 transformResponse
                result = transformResponse(response);
            } else {
                //默认返回服务中的data
                result = resp.data;
            }
            return result;
        };

        return data;

    }
}