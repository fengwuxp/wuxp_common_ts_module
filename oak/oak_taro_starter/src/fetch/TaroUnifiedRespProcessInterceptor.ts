import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "common_fetch/src/FetchOptions";
import {ApiResp} from "oak_weex_common/src/model/api/ApiResp";
import StringUtils from "common_utils/src/string/StringUtils";


/**
 * 统一数据处理
 */
export default class TaroUnifiedRespProcessInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    private taro: any;

    private toastImageUrl: string;

    constructor(taro: any, toastImageUrl?: string) {
        super();
        this.taro = taro;
        this.toastImageUrl = toastImageUrl;
    }


    postHandle = (data: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | null | undefined => {


        const resp: ApiResp = data.data;

        if (resp.code !== 0) {

            //加入错误提示
            if (StringUtils.hasText(resp.message) && options.useUnifiedToast !== false) {
                //使用统一提示
                const config: any = {
                    title: resp.message,
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

        const oldTransform = options.transformResponse;

        //响应数据转换
        options.transformResponse = (response: FetchResponse) => {
            let result = null;
            if (typeof oldTransform == "function") {
                //将原始响应传递给 transformResponse
                result = oldTransform(resp as any) as any;
            } else {
                //默认返回服务中的data
                result = response.data;
            }
            return result;
        };

        return data;

    }
}