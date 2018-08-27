import {SimpleView} from "./SimpleView";


/**
 * 带刷新的视图
 */
export interface RefreshView/*<T> extends SimpleView<T>*/ {


    /**
     * 刷新事件
     */
    onRefreshEventHandle: () => Promise<any> | void;


}
