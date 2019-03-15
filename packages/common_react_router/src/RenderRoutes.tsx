import React from "react";
import {CommonRouteConfig} from "./CommonRouteConfig";
import DefaultPrivateRoute from "./route/DefaultPrivateRoute";
import {AppRouterAuthenticator} from "./AppRouterAuthenticator";
import {GlobalRouterRouteConfig} from "./GlobalRouterRouteConfig";
import {Route, Switch, SwitchProps} from "react-router";

/**
 * 渲染routes
 * @param routes
 * @param authenticator
 * @param globalRouterRouteConfig
 * @param extraProps
 * @param switchProps
 */
export const renderRoutes = (
    routes: CommonRouteConfig[],
    authenticator: AppRouterAuthenticator<any>,
    globalRouterRouteConfig: GlobalRouterRouteConfig = {},
    extraProps = {},
    switchProps: SwitchProps = {}) =>
    routes ? (
        <Switch {...switchProps}>
            {routes.map((route: CommonRouteConfig, i) => {
                const {requiredAuth, key, path, exact, strict, component} = route;
                const RouteComponent = component as any;
                const needAuth = requiredAuth == null ? globalRouterRouteConfig.requiredAuth : requiredAuth;
                const _exact = exact == null ? globalRouterRouteConfig.exact : exact;
                const _strict = strict == null ? globalRouterRouteConfig.strict : strict;

                return needAuth ?
                    <DefaultPrivateRoute
                        authenticator={authenticator}
                        toLoginViewPathname={globalRouterRouteConfig.toLoginViewPathname}
                        component={component}
                        path={path}
                        exact={_exact}
                        strict={_strict}
                        key={key || i}/> :
                    <Route key={key || i}
                           path={path}
                           exact={_exact}
                           strict={_strict}
                           render={props => (
                               <RouteComponent {...props} {...extraProps} route={route}/>
                           )}
                    />
            })}
        </Switch>
    ) : null;


