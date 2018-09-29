import {Exception} from "../Exception";
import {ExceptionHandler} from "../handler/ExceptionHandler";
import HttpFetchExceptionHandler from "../http/HttpFetchExceptionHandler";
import {HttpFetchExceptionName} from "../http/Const";


const exceptionHandlerMap: Map<string, ExceptionHandler> = new Map<string, ExceptionHandler>();


//默认加入http异常处理者
exceptionHandlerMap.set(HttpFetchExceptionName, new HttpFetchExceptionHandler());

/**
 * 异常广播者
 * @author wxup
 * @create 2018-09-29 18:50
 **/
export default class ExceptionBroadcaster {

    /**
     * 添加处理者
     * @param exceptionName
     * @param handler
     */
    public addHandler = (exceptionName: string, handler: ExceptionHandler) => {
        exceptionHandlerMap.set(exceptionName, handler);
    };

    /**
     * 移除处理者
     * @param exceptionName
     */
    public removeHandler = (exceptionName: string) => {
        exceptionHandlerMap.delete(exceptionName);
    };

    public static broadcast = (exception: Exception) => {
        const handler = exceptionHandlerMap.get(exception.name);
        if (handler == null) {
            return;
        }
        //处理异常
        handler.handle(exception);
    }
}
