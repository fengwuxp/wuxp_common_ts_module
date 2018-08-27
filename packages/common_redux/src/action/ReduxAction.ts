import {Action} from "redux";
import {Observable, interval, from, merge, of} from 'rxjs'
/**
 * redux action
 */
export interface ReduxAction<S, K extends keyof S = any> extends Action<string> {

    /**
     * 数据负载 用来传递state 数据
     */
    payload: K;

}
