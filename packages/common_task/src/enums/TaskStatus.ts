/**
 * 任务状态
 */
export enum TaskStatus {

    /**
     * 等待
     */
    WAIT,


    /**
     * 进行中
     */
    PROCESSING,


    /**
     * 中断，表示可以恢复
     */
    INTERRUPT,


    /**
     * 丢弃本次任务，不可恢复
     */
    THROW_AWAY,

    /**
     * 完成
     */
    COMPLETED
}
