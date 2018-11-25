import {parse, stringify} from "querystring";
import StringToHexUtil from "common_utils/src/codec/StringToHexUtil";
import StringUtils from "common_utils/src/string/StringUtils";
import {ignoreParamNames} from "../constant/IgnoreParamNames";


/**
 * url参数解析
 */
export default class URLArgumentsResolve {


    constructor() {
    }

    /**
     * 参数拼接
     * @param params
     * @param {boolean} hexEncoding
     * @returns {string}
     */
    public argumentsToString = (params: object = {}, hexEncoding: boolean = true): string => {


        let queryString: string = "";

        if (hexEncoding) {
            //转为16进制数据
            const encodePrams = {};
            for (let key in params) {

                if (ignoreParamNames.indexOf(key) >= 0) {
                    encodePrams[key] = params[key];
                } else {
                    //对所有的值都进行16进制的转化
                    encodePrams[key] = StringToHexUtil.encode(params[key]);
                }
            }
            queryString = stringify(encodePrams);
        } else {
            queryString = stringify(params);

        }

        return queryString;
    };


    /**
     * 解析参数
     * @param {string} url
     * @param {boolean} hexDecoding 16进制解码
     * @returns {any}
     */
    public parseArguments = (url: string, hexDecoding: boolean = true): any => {


        //查询字符串
        const queryString: string = url.split("?")[0];

        if (!StringUtils.hasText(queryString)) {
            return {};
        }
        //查询字符串解析
        const params: object = parse(queryString);
        if (hexDecoding) {
            for (const key in params) {
                if (ignoreParamNames.indexOf(key) < 0) {
                    //16进制解码
                    params[key] = StringToHexUtil.decode(params[key]);
                }
            }
        }
        const result = {};
        //布尔值转化
        for (const key in params) {
            let param = params[key];
            if (param === "true" || param === "false") {
                result[key] = Boolean(param);
            } else {
                result[key] = param;
            }
        }

        return result;
    };


}
