/**
 * 可运行的
 */
export interface Runnable<Q, P> {

    // run: (q: Q) => P;

    run: (...args) => P;
}