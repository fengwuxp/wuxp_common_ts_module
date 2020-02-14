import {RouteComponentProps, RouteProps} from "react-router";
import {AppRouterAuthenticator} from "../AppRouterAuthenticator";
import * as React from "react";


/**
 * private route props
 */
export interface PrivateRouteProps extends RouteProps {

    /**
     * 鉴权者
     */
    authenticator: AppRouterAuthenticator<any>;

    /**
     * 登录的pathname，默认 'login'
     */
    toLoginViewPathname?: string;

    /**
     * 额外的属性
     */
    extraProps: {};
}


/**
 * 私有路由的定义
 */
export type PrivateRoute = React.ComponentType<PrivateRouteProps>;
