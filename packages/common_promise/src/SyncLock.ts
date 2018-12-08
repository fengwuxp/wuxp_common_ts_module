/**
 * 同步锁，用于同步等待异步操作
 */
export interface SyncLock<T = any> {

    /**
     * 锁定
     */
    lock: ()=>Promise<T>;

    /**
     * 解锁
     */
    unLock:()=>Promise<T>;
}

export abstract class AbstractSyncLock<T> implements SyncLock<T>{

    lock: () => Promise<T>;

    unLock: () => Promise<T>;


}