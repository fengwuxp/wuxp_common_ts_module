/**
 * 数据提供者
 */
export interface DataProvider<S = any> {

    setState<K extends keyof S>(state: ((prevState: Readonly<S>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
                                callback?: () => void): void;

}

export type FunctionDataProvider<S = any> = (...args) => S;

