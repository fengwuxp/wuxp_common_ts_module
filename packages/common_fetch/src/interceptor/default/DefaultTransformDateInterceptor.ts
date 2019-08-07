import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {isBrowserFormData} from "../../utils/EvnAndTypeUtil";

/**
 * 默认处理时间类型属性的方式
 */
export default class DefaultTransformDateInterceptor extends AbstractFetchInterceptor<FetchOptions> {

    preHandle = (params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined => {

        const data = params.data;

        if (isBrowserFormData(data)) {
            return params;
        }
        if (data != null) {
            for (const key in data) {
                const val = data[key];
                if (val != null && val.constructor === Date) {
                    //如果是时间字段转换为时间戳
                    data[val] = (val as Date).getTime();
                }
            }
        }


        return params;
    };


    // postHandle = (response: FetchResponse, options: FetchOptions): FetchResponse | Promise<FetchResponse> | undefined | null => {
    //
    //     //TODO 尝试转换时间搓类型的字段 number to date
    //
    //
    //     return response;
    // }


}