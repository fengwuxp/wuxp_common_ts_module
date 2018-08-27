import {Parser} from "./Parser";
import {Printer} from "./Printer";

/**
 * 格式化T对象。
 * 格式化程序既是打印机 又是 对象类型的解析器。
 * Formats objects of type T.
 * A Formatter is both a Printer <i>and</i> a Parser for an object type.
 *
 * @author wxup
 * @create 2018-07-28 15:18
 **/
export interface Formatter<T> extends Parser<T>,Printer<T>{

}
