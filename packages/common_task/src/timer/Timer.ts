/**
 * 定时器任务处理者
 */
export  type TimerHandle = (...args: any[]) => void;

/**
 * 定时器接口定义
 * @author wxup
 * @create 2018-07-13 11:45
 **/
export interface Timer {

    clearInterval(handle?: number): void;

    clearTimeout(handle?: number): void;

    clearImmediate?(handle: number): void;

    setInterval(handler: TimerHandle, timeout: number): number;

    // setInterval(handler: any, timeout?: any, ...args: any[]): number;

    setTimeout(handler: TimerHandle, timeout: number): number;

    // setTimeout(handler: any, timeout?: any, ...args: any[]): number;

    setImmediate?(handler: TimerHandle): number;

    // setImmediate?(handler: any, ...args: any[]): number;
}
