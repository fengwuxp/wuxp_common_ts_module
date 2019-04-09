/**
 * 数据提供者
 */
export interface DataProvider<S = any> {

    setState?: <K extends keyof S>(state: StateType<S, K>,
                                  callback?: () => void) => void;

    defaultState?: <K extends keyof S>() => StateType<S, K> | Promise<StateType<S, K>>;

}

export type FunctionDataProvider<S = any> = (...args) => S;

export type StateType<S, K extends keyof S> =
    ((prevState: Readonly<S>) => (Pick<S, K> | S | null))
    | Pick<S, K>
    | S
    | null;