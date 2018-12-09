import {ExceptionHandler} from "./ExceptionHandler";
import {Exception} from "../Exception";
import {ExceptionRepairer} from "../ExceptionRepairer";

/**
 * 简单异常处理者
 * @author wxup
 * @create 2018-09-29 17:58
 **/
export default class SimpleExceptionHandler implements ExceptionHandler {


    protected repairerMap: Map<any, ExceptionRepairer>;


    constructor(repairerMap: Map<any, ExceptionRepairer>) {
        this.repairerMap = repairerMap || new Map<any, ExceptionRepairer>();
    }

    handle = (exception: Exception) => {

        const repairer = this.repairerMap.get(exception.message);
        if (repairer == null) {
            console.warn(`未找到异常${exception.name}的修复者`);
            return;
        }
        repairer.repair(exception);
    };

}
