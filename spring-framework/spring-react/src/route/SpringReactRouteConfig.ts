import {RouteConfig} from "react-router-config";

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
     * @param context 应用上下文
     */
    condition?: (context) => boolean | string | boolean;

    /**
     * children
     */
    routes?: SpringReactRouteConfig[]
}
