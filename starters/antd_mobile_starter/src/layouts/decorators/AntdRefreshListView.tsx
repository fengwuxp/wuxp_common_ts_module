import * as React from "react";
import {PullToRefresh} from "antd-mobile";
import {AntdRefresh} from "./AntdRefresh";
import {RefreshView} from "common_view/src/RefreshView";


export interface AntdRefreshListViewOptions {

}


/**
 * 带刷新的列表视图
 * @param {AntdRefreshListViewOptions} options
 * @return {(constructor: any) => any}
 * @constructor
 */
export function AntdRefreshListView<T extends RefreshView>(options?: AntdRefreshListViewOptions) {
    /**
     * decorator
     * @param  {T} constructor
     */
    return (constructor: any): any => {

        @AntdRefresh()
        class RefreshListView extends constructor {


            protected getPullToRefresh = () => <PullToRefresh direction={"down"}
                                                              distanceToRefresh={25}
                                                              getScrollContainer={() => null}
                                                              damping={100}
                                                              indicator={this.getIndicator()}
                                                              refreshing={this.state.refreshing}
                                                              onRefresh={this.onRefreshEventHandle}/>;


        }

        return RefreshListView
    }
}
