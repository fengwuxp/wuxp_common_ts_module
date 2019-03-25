
import {State} from "./State";

/**
 * 数据提供者
 */
export interface DataProvider<T> {


}

export class DefaultDataProvider<S> implements DataProvider<S> {


    private state: State<S>;


}