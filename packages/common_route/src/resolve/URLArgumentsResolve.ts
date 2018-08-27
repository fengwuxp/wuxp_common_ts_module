import {parse, stringify} from "querystring";
import StringToHexUtil from "common_utils/src/codec/StringToHexUtil";
import StringUtils from "common_utils/src/string/StringUtils";


/**
 * url参数解析
 */
export default class URLArgumentsResolve {

    /**
     * 默认url 参数转16进制key
     * @type {string}
     */
    private encodeParamKey: string;

    //固定参数key
    private FixedPramKeys: string[];


    constructor(encodeParamKey: string, FixedPramKeys: string[] = []) {
        this.encodeParamKey = encodeParamKey;
        this.FixedPramKeys = FixedPramKeys;
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

            //固定参数
            const fixedParams = {};

            //需要进行编码的参数
            const encodePrams = {};

            for (let key in params) {
                let param = params[key];
                if (this.isFixedParamKey(key)) {
                    //跳过固定参数
                    fixedParams[key] = param;
                } else {
                    encodePrams[key] = param;
                }
            }
            queryString = this.encodeParamKey + "=" + StringToHexUtil.encode(queryString) + "&" + stringify(fixedParams);

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

        const DEFAULT_PARAM_KEY_NAME: string = this.encodeParamKey;

        //查询字符串
        const queryString: string = url.split("?")[0];

        if (!StringUtils.hasText(queryString)) {
            return {};
        }
        let params: object = parse(queryString);
        const s: string = params[DEFAULT_PARAM_KEY_NAME];
        if (hexDecoding && s != null) {
            //查询字符串解析
            params = {
                ...params,
                ...parse(StringToHexUtil.decode(s))
            };
        }
        const result = {};
        for (const key in params) {
            let param = params[key];
            if (param === "true" || param === "false") {
                result[key] = Boolean(param);
            } else {
                result[key] = param;
            }
        }

        delete result[DEFAULT_PARAM_KEY_NAME];
        return result;
    };

    /**
     * 是否为固定的参数
     * @param key
     */
    private isFixedParamKey = (key) => {

        return this.FixedPramKeys.some((item) => item === key);
    };

}
