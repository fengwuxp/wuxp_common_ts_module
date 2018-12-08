// import {SyncLock} from "./SyncLock";
//
//
// /**
//  * 条件锁
//  */
// export interface ConditionalLock<T=any> {
//
//     conditional:(...args)=>T
//
// }
//
// export abstract class AbstractConditionalLock<T> implements ConditionalLock<T>{
//
//     private syncLock:SyncLock;
//
//
//     conditional= (...args) :T=> {
//
//        const lock= this.syncLock.lock();
//
//         return null;
//     };
//
//
//
//
// }