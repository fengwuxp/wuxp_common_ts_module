import {RefreshView} from "./RefreshView";

/**
 * 分页查询的视图
 */
export interface PagingQueryView extends RefreshView {


    /**
     * 下一页
     * @param args
     */
    nextPage: (...args) => any;

}