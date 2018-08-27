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
    public static  trim = (val: String): string => {
        if (isNullOrUndefined(val)) {
            return "";
        }
        if (!isString(val)) {
            val = val.toString();
        }
        return val.trim();
    };

}
