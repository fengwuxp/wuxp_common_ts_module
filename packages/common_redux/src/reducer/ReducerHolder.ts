export type ReducerHandlerProps<P, K extends keyof P> =
    ((prevState: Readonly<P>) => (Pick<P, K> | P | null))
    | (Pick<P, K> | P | null)


export type SetPropMethod<P> = <K extends keyof P>(
    newState: P,
    state?: P
) => void | P;

/**
 * reducer的持有者
 */
export interface ReducerHolder<P> {

    /**
     * 默认的state
     */
    defaultState: P;


    /**
     * 设置 props 用来更新 store中的state
     * 所有的 reducer更新state都需要通过该方法
     * @param newState
     * @param state
     */
    setProps: SetPropMethod<P>;
}