import React from "react";
import {ListView} from "antd-mobile";
import {AntdRefreshListView} from "../decorators/AntdRefreshListView";
import AntdAbstractView, {AntdAbstractViewState} from "./AntdAbstractView";
import {PagingQueryView} from "common_view/src/PagingQueryView";
import {AntdAbstractQueryViewProps} from "./AntdAbstractQueryView";
import {AntdRefreshState} from "./AntdAbstractRefreshView";
import {PagingQueryHelper} from "common_starter/src/helper/PagingQueryHelper";
import {FetchResponse} from "common_fetch/src/fetch/FetchOptions";
import {PageInfo} from "common_starter/src/api/model/PageInfo";
import {FetchOptions} from "common_fetch/src/fetch/FetchOptions";
import {ServiceQueryEvt} from "common_starter/src/api/model/ServiceQueryEvt";
import SimplePagingQueryHelper, {SimpleQueryHandle} from "common_starter/src/helper/SimplePagingQueryHelper";


export interface AntdAbstractListViewProps extends AntdAbstractQueryViewProps {

}

export interface AntdAbstractListViewState<T = any> extends AntdAbstractViewState, AntdRefreshState {

    dataSource: T
}

/**
 * 基于antd的 listView
 */
@AntdRefreshListView()
export default abstract class AntdAbstractListView<P extends AntdAbstractListViewProps,
    S extends AntdAbstractListViewState>
    extends AntdAbstractView<P, S>
    implements PagingQueryView {

    protected queryHelper: PagingQueryHelper;

    protected listLength: number;


    constructor(props: P, context: any, queryHelper?: PagingQueryHelper) {
        super(props, context);
        if (queryHelper) {
            this.queryHelper = queryHelper;
        } else {
            this.queryHelper = new SimplePagingQueryHelper(this.queryHandle);
        }

    }


    /**
     * 触发下拉刷新
     */
    abstract onRefresh: () => Promise<any>;


    /**
     * 查询下一页的数据
     * @param req
     * @param options
     */
    nextPage<T = any, Q extends ServiceQueryEvt = ServiceQueryEvt>(req: Q, options: FetchOptions): Promise<FetchResponse<PageInfo<T>>> {

        return this.queryHelper.queryNextPage(req, options);
    }


    /**
     * 装饰器中实现了该方法
     * see AntdRefresh
     */
    onRefreshEventHandle: () => void;


    /**
     * 默认的data sources实现
     * @param options
     * @return {any}
     */
    genDataSource = (options: any = {}) => {
        const dataSource = new ListView.DataSource({

            /**
             * 获取每一行的数据
             * @param dataBlob
             * @param sectionID
             * @param rowID
             * @return {any}
             */
            getRowData: (dataBlob, sectionID, rowID) => {
                return dataBlob[sectionID][rowID];
            },

            /**
             * 行数据是否发生改变
             * @param row1
             * @param row2
             * @return {boolean}
             */
            rowHasChanged: (row1, row2) => {
                return row1 !== row2
            },
            ...options
        });

        return dataSource
    };

    /**
     * 获取PullToRefresh组件
     * 装饰器中实现了该方法
     * see AntdRefreshListView
     */
    protected getPullToRefresh: () => React.ReactNode;


    /**
     *  当所有的数据都已经渲染过，
     *  并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
     * @param event
     */
    protected onEndReached = (event) => {
        if (!this.queryHelper.hasNextPage(this.listLength || 0)) {
            return;
        }
        this.queryHelper.queryNextPage().then((data) => {
            //更新数据
            this.updateListData(data);
        }).catch((e) => {
            //TODO数据加载失败
            console.log(e);
        });
    };


    /**
     * 渲染listView的底部
     */
    protected renderListViewFooter = () => {

        return <div style={{padding: 30, textAlign: 'center'}}>
            {this.queryHelper.isLoading() ? '数据加载中...' : '加载完成'}
        </div>;
    };


    /**
     * 列表数据是否为空
     * @return {boolean}
     */
    protected listViewIsEmpty = (): boolean => {
        if (this.listLength == null) {
            return false;
        }
        return this.queryHelper.hasNextPage(this.listLength);
    };


    /**
     * 查询处理
     * @param req
     * @param options
     */
    protected abstract queryHandle<T = any, Q extends ServiceQueryEvt = ServiceQueryEvt>(req: Q, options?: FetchOptions): Promise<FetchResponse<PageInfo<T>>>;

    /**
     * 渲染空列表
     */
    protected abstract renderEmptyView: () => React.ReactNode;

    /**
     * 渲染每一行数据
     */
    protected abstract renderRowItem: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => React.ReactElement<any>;

    /**
     * 更新数据
     */
    protected abstract updateListData: (...args) => void;

}
