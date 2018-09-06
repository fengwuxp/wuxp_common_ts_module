import {Runnable} from "./Runnable";

/**
 * 异步可运行的
 */
export interface AsyncRunnable<Q, P> extends Runnable<Q, Promise<P>> {

}
