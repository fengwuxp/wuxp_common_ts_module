import * as React from "react";
import {Icon,Flex} from "antd-mobile";
import {Indicator} from 'rmc-pull-to-refresh/lib/PropsType';
import {RefreshView} from "fengwuxp_common_view/src/RefreshView";


export interface AntdRefreshOptions {

}


/**
 * 带刷新的视图
 * @param {AntdRefreshOptions} options
 * @return {(constructor: any) => any}
 * @constructor
 */
export function AntdRefresh<T extends RefreshView>(options?: AntdRefreshOptions) {
    /**
     * decorator
     * @param  {T} constructor
     */
    return (constructor: any): any => {

        return class extends constructor implements RefreshView {


            /**
             * 最小刷新间隔时间 单位毫秒
             * @type {number}
             */
            protected minRefreshTime = 1500;


            onRefreshEventHandle = () => {
                const beginTime = new Date().getTime();
                const minRefreshTime = this.minRefreshTime;
                this.setState({refreshing: true});
                const promise = this.onRefresh();
                promise.finally(() => {
                    const endTime = new Date().getTime();

                    let number = endTime - beginTime;
                    if (number > minRefreshTime) {
                        this.setState({refreshing: false});
                    } else {
                        setTimeout(() => {
                            this.setState({refreshing: false});
                        }, minRefreshTime + 100 - number);

                    }
                });

            };

            getIndicator = (): Indicator => {
                return {
                    activate: "松开刷新",
                    deactivate: '上拉可以刷新',
                    release: <Flex justify={"center"} align={"center"}>
                        <Icon type="loading"/>
                        <span style={{marginLeft: 10}}>正在加载</span>
                    </Flex>,
                    finish: "刷新完成"
                }
            };


            getScrollContainer = (): React.ReactNode => null;

        }
    }
}
