import {RouteConfig, RouteConfigComponentProps} from "react-router-config";
import {ConditionType} from "fengwuxp-spring-context/src/condition/ConditionType";
import * as React from "react";

//组件加载者
export type ComponentLoader = () => any;

/***
 * SpringReactRouteConfig
 */
export interface SpringReactRouteConfig extends RouteConfig {


    /**
     * 视图名称
     */
    name?: string;

    /**
     * 视图组件
     */
    component?: ComponentLoader | React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;

    /**
     * 进入页面的条件 例如进行权限检查
     * default true
     */
    condition?: ConditionType;

    /**
     * 是否需要鉴权（login）
     * default use global config
     */
    // requiredAuth?: boolean;

    /**
     * children
     */
    routes?: SpringReactRouteConfig[];
}
