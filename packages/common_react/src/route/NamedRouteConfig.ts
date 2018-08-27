import {RouteConfig} from "react-router-config";

/***
 * 命名的 config配置
 */
export interface NamedRouteConfig extends RouteConfig {

    /**
     * 视图名称
     */
    name?: string;

    /**
     * 是否需要鉴权（登录）
     */
    needAuth?: boolean;
}
