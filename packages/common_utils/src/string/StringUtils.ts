import {isNullOrUndefined, isString} from "util";

/**
 * 字符串工具类
 */
export default class StringUtils {

    /**
     * 是否存在内容
     * @param {string} str
     * @return {boolean}
     */
    public static hasText = (str: string): boolean => {
        if (isNullOrUndefined(str)) {
            return false;
        }
        if (str.trim().length === 0) {
            return false;
        }
        return true;
    };

    /**
     * 字符串去空格
     * @param {String} val
     * @return {number}
     */
    public static trim = (val: String): string => {
        if (isNullOrUndefined(val)) {
            return "";
        }
        if (!isString(val)) {
            val = val.toString();
        }
        return val.trim();
    };

    /**
     * 是否为json字符串的格式
     * @param str
     */
    public static isJSONString = (str: string): boolean => {

        if (!isString(str)) {
            return false;
        }

        str = str.replace(/\s/g, '')
            .replace(/\n|\r/, '');

        if (/^\{(.*?)\}$/.test(str)) {
            return /"(.*?)":(.*?)/g.test(str);
        }


        if (!/^\[(.*?)\]$/.test(str)) {
            return false;
        }

        return str.replace(/^\[/, '')
            .replace(/\]$/, '')
            .replace(/},{/g, '}\n{')
            .split(/\n/)
            .map((s) => StringUtils.isJSONString(s))
            .reduce((prev, curr) => !!curr);
    };
}
