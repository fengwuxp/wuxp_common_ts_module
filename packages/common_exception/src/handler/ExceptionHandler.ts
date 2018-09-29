import {Exception} from "../Exception";

/**
 * 异常处理者
 * @author wxup
 * @create 2018-09-29 17:52
 **/

export interface ExceptionHandler {

    /**
     * 处理
     * @param exception
     */
    handle: (exception: Exception) => void;
}
