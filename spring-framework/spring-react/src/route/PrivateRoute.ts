import {RouteProps} from "react-router";
import {AppRouterAuthenticator} from "./AppRouterAuthenticator";
import * as React from "react";
import {ConditionType} from "fengwuxp-spring-context/src/condition/ConditionType";


/**
 * private route props
 */
export interface PrivateRouteProps extends RouteProps {

    /**
     * 鉴权者
     */
    authenticator: AppRouterAuthenticator<any>;

    /**
     * 登录的pathname
     * default "login"
     */
    loginView?: string;

    /**
     * 无权限页面
     * default "no_permission"
     */
    noPermissionView?: string;

    /**
     * 进入页面的条件，例如进行权限检查
     * default true
     * @param context 应用上下文
     */
    condition?: ConditionType;

    /**
     * default null
     */
    requiredAuth?: boolean;

    /**
     * 额外的属性
     */
    extraProps: {};

    key?: string | number;
}


/**
 * 私有路由的定义
 */
export type PrivateRoute = React.ComponentType<any>;
