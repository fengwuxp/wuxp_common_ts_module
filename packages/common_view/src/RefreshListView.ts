import {RefreshView} from "./RefreshView";


/**
 * 带刷新的列表视图
 */
export interface RefreshListView<T> extends RefreshView<T> {


    /**
     * 刷新事件
     */
    onRefreshEventHandle: () => Promise<any> | void;


}
