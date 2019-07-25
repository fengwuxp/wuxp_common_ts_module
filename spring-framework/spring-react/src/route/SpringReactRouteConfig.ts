import {RouteConfig} from "react-router-config";
import {ConditionType} from "fengwuxp-spring-context/src/condition/ConditionType";

/***
 * SpringReactRouteConfig
 */
export interface SpringReactRouteConfig extends RouteConfig {

    /**
     * 视图名称
     */
    name?: string;

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
