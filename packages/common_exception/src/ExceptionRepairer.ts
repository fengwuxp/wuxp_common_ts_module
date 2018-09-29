import {Exception} from "./Exception";

/**
 * 异常修复者，尝试修复异常
 * @author wxup
 * @create 2018-09-29 17:36
 **/
export interface ExceptionRepairer {

    repair: (exception: Exception) => void;
}
