import {TaskStatus} from "./enums/TaskStatus";

/**
 * 任务
 */
export interface Task {


    /**
     * 获取当前状态
     */
    getStatus: () => TaskStatus;

    /**
     * 获取任务名称
     */
    getName: () => string;


    /**
     * 运行
     */
    run?: () => void;

    /**
     * 中断
     */
    interrupt?: () => void;

    /**
     * 丢弃本次任务
     */
    throwAway?: () => void;

}


