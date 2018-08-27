import * as React from "react";
import {AntdRefreshView} from "../decorators/AntdRefreshView";
import {AntdRefreshState} from "./AntdAbstractRefreshView";
import AntdAbstractView, {AntdAbstractViewProps, AntdAbstractViewState} from "./AntdAbstractView";
import {RefreshView} from "common_view/src/RefreshView";

export interface AntdAbstractQueryViewProps extends AntdAbstractViewProps {

}

export interface AntdAbstractQueryViewState extends AntdAbstractViewState, AntdRefreshState {

}


/**
 * 带下拉刷新的查询视图
 */
@AntdRefreshView()
export default abstract class AntdAbstractQueryView<P extends AntdAbstractQueryViewProps,
    S extends AntdAbstractQueryViewState> extends AntdAbstractView<P, S>
    implements RefreshView {


    constructor(props: P, context: any) {
        super(props, context);
    }


    /**
     * 装饰器中实现了该方法
     * see AntdRefresh
     */
    onRefreshEventHandle: () => void;

    /**
     * 刷新
     */
    abstract onRefresh: () => Promise<any>;

}
