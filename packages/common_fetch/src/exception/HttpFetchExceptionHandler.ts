import {ExceptionHandler} from "fengwuxp_common_exception/src/handler/ExceptionHandler";
import {ExceptionRepairer} from "fengwuxp_common_exception/src/ExceptionRepairer";
import {HttpFetchException} from "./HttpFetchException";

/**
 * http fetch 异常处理者
 * @author wxup
 * @create 2018-09-29 17:46
 **/
export default class HttpFetchExceptionHandler implements ExceptionHandler {


    //默认的异常修复者
    public static defaultRepairer: ExceptionRepairer;

    protected repairerMap: Map<number, ExceptionRepairer> = new Map<number, ExceptionRepairer>();

    handle = (exception: HttpFetchException) => {

        let repairer = this.repairerMap.get(exception.httpCode);
        if (repairer == null) {
            console.warn(`未找到HttpFetchException, code=${exception.httpCode}的修复者`);
            repairer = HttpFetchExceptionHandler.defaultRepairer;
        }
        if (repairer == null) {
            return;
        }
        repairer.repair(exception);

    };


}
