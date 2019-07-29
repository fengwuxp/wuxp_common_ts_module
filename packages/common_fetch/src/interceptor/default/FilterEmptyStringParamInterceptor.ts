import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions} from "../../FetchOptions";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


/**
 * 过滤参数中的null 和 空字符串
 */
export default class FilterEmptyStringParamInterceptor extends AbstractFetchInterceptor<FetchOptions> {


    preHandle = (options: FetchOptions): Promise<FetchOptions> => {

        const {filterEmptyString, data} = options;

        if (filterEmptyString === false || data == null) {
            return Promise.resolve(options);
        }
        const newData = {};
        for (const key in data) {
            const value = data[key];
            if (typeof value === "string") {
                if (StringUtils.hasText(value)) {
                    newData[key] = value;
                }
            } else {
                newData[key] = value;
            }
        }
        options.data = newData;

        return Promise.resolve(options);

    };


}