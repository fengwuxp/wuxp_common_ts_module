import {ExceptionHandler} from "./ExceptionHandler";
import ExceptionRepairRegistry from "../ExceptionRepairRegistry";
import {Exception} from "../Exception";

/**
 * 简单异常处理者
 * @author wxup
 * @create 2018-09-29 17:58
 **/
export default class SimpleExceptionHandler implements ExceptionHandler {

    protected repairRegistry: ExceptionRepairRegistry;


    constructor(repairRegistry: ExceptionRepairRegistry) {
        this.repairRegistry = repairRegistry;
    }

    handle = (exception: Exception) => {

        const repairer = this.repairRegistry.get(exception.name);
        if (repairer == null) {
            console.warn(`未找到异常${exception.name}的修复者`);
            return;
        }
        repairer.repair(exception);
    };

}
