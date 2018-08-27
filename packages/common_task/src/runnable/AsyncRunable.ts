import {Runnable} from "./Runnable";

/**
 * 异步可运行的
 */
export interface AsyncRunable<Q, P> extends Runnable<Q, Promise<P>> {

}