import * as React from "react";
import AntdAbstractView, {AntdAbstractViewState} from "./AntdAbstractView";
import {AntdRefreshView} from "../decorators/AntdRefreshView";
import {RefreshView} from "common_view/src/RefreshView";
import {AntdAbstractQueryViewProps} from "./AntdAbstractQueryView";


export interface AntdRefreshState {

    /**
     * 数据刷新中
     */
    refreshing: boolean;
}

export interface AntdAbstractRefreshViewProps extends AntdAbstractQueryViewProps {

}

export interface AntdAbstractRefreshViewState extends AntdAbstractViewState, AntdRefreshState {


}


/**
 * 带下来刷新的普通视图
 */
@AntdRefreshView()
export default abstract class AntdAbstractRefreshView<P extends AntdAbstractRefreshViewProps, S extends AntdAbstractRefreshViewState>
    extends AntdAbstractView<P, S> implements RefreshView {


    constructor(props: P, context: any) {
        super(props, context);
    }


    onRefreshEventHandle: () => void;

    abstract onRefresh: () => void;
}
