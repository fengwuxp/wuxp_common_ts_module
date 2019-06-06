import {RouteConfig} from "react-router-config";
import {Condition} from "../condition/Condition";

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
    condition?: Condition;

    /**
     * children
     */
    routes?: SpringReactRouteConfig[]
}
