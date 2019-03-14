import {RouteConfig} from "react-router-config";

/***
 * common config配置
 */
export interface CommonRouteConfig extends RouteConfig {

    /**
     * 视图名称
     */
    name?: string;

    /**
     * 是否需要鉴权
     * @link{./GlobalRouterRouteConfig.ts}
     * 默认值为全局路由配置中的值，如果有传可以覆盖全局配置中的值
     */
    requiredAuth?: boolean;

    routes?: CommonRouteConfig[]
}
