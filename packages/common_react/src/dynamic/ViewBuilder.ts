import * as React from "react";

/**
 * 视图构建者
 * @author wxup
 * @create 2018-09-09 21:55
 **/
export interface ViewBuilder {


    /**
     * 挂载组件
     * @param node
     */
    mount: (node: React.ReactNode) => void;


    /**
     * 卸载组件
     */
    unMount: () => void;

}
