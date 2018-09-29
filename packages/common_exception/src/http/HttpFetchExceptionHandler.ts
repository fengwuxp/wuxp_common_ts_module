import {ExceptionHandler} from "../handler/ExceptionHandler";
import {HttpFetchException} from "./HttpFetchException";
import {ExceptionRepairer} from "../ExceptionRepairer";
import HttpExceptionRepairRegistry from "./HttpExceptionRepairRegistry"

/**
 * http fetch 异常处理者
 * @author wxup
 * @create 2018-09-29 17:46
 **/
export default class HttpFetchExceptionHandler implements ExceptionHandler {


    //默认的修复者
    public static defaultRepairer: ExceptionRepairer;

    handle = (exception: HttpFetchException) => {

        const repairer = HttpExceptionRepairRegistry.get(exception.httpCode);
        if (repairer != null) {
            repairer.repair(exception);
            return
        }
        const defaultRepairer = HttpFetchExceptionHandler.defaultRepairer;
        if (defaultRepairer != null) {
            defaultRepairer.repair(exception);
        }

    };


}
