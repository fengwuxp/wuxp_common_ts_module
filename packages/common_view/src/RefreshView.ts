import {BaseAppView} from "./BaseAppView";


/**
 * 带刷新的视图
 */
export interface RefreshView<T> /*extends BaseAppView<T>*/
{


    /**
     * 刷新事件
     */
    onRefreshEventHandle: () => Promise<any> | void;


}
