import {Locale} from "../in81/Locale";

/**
 *
 * @author wxup
 * @create 2018-07-28 15:15
 **/

export interface Printer<T> {

    /**
     * 打印类型为T的对象以供显示。
     * Print the object of type T for display.
     * @param {T}object
     * @param {Locale}local
     * @return {string}
     */
    print: (object: T, local?: Locale) => string;
}
