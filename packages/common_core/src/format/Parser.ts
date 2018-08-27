import {Locale} from "../in81/Locale";

/**
 * @author wxup
 * @create 2018-07-28 15:04
 **/
export interface Parser<T> {

    /**
     * 解析文本字符串以生成<T>的实例
     * Parses text strings to produce instances of T.
     *
     * @param {string} text  文本内容
     * @param {Locale} local
     * @return {T}
     */
    paras: (text: string, local?: Locale) => T;
}
