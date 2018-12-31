import {parse, stringify} from "querystring";
import StringToHexUtil from "common_utils/src/codec/StringToHexUtil";
import StringUtils from "common_utils/src/string/StringUtils";
import {ignoreParamNames} from "../constant/IgnoreParamNames";
import {URLArgumentsResolve} from "./URLArgumentsResolve";


/**
 * 默认的url参数解析器
 * 将所有的参数转换为json字符串并且进行16进制编码
 */
export default class DefaultURLArgumentsResolve implements URLArgumentsResolve {

    //JSON 参数名称
    private static JSON_PARAMS_NAME = "q_string_to_json";

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
            const encodeParams = {};

            //转换为json字符串的参数
            const toJSONStringParams = {};
            for (let key in params) {
                const param = params[key];
                if (param == null) {
                    continue;
                }
                if (ignoreParamNames.indexOf(key) >= 0) {
                    //忽略转换的值
                    encodeParams[key] = param;
                } else {
                    toJSONStringParams[key] = param;
                }
            }
            //所有的参数使用json字符串传递
            encodeParams[DefaultURLArgumentsResolve.JSON_PARAMS_NAME] =  StringToHexUtil.encode(JSON.stringify(toJSONStringParams));
            queryString = stringify(encodeParams);
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
        const queryString: string = url.split("?")[1];

        if (!StringUtils.hasText(queryString)) {
            return {};
        }
        //查询字符串解析
        const params: object = parse(queryString);
        if (hexDecoding) {
            //处理编码
            for (const key in params) {
                //16进制解码
                if (key == DefaultURLArgumentsResolve.JSON_PARAMS_NAME) {
                    params[key] = StringToHexUtil.decode(params[key]);
                }
            }
            const jsonStringParams = params[DefaultURLArgumentsResolve.JSON_PARAMS_NAME];
            if (StringUtils.hasText(jsonStringParams)) {
                //解析json字符串
                const p = JSON.parse(jsonStringParams);
                //移除
                delete params[DefaultURLArgumentsResolve.JSON_PARAMS_NAME];
                //合并最终的参数
                Object.assign(params, p);
            }
        }
        return params;
    };

}

