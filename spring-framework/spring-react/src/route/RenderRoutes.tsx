import React from "react";
import {AppRouterAuthenticator} from "./AppRouterAuthenticator";
import {Route, Switch, SwitchProps} from "react-router";
import {SpringReactRouteConfig} from "./SpringReactRouteConfig";
import DefaultPrivateRoute from "./DefaultPrivateRoute";
import {RouteConfiguration} from "fengwuxp-spring-context/src/configuration/route/RouteConfiguration"
import {PrivateRouteProps} from "./PrivateRoute";

/**
 * 渲染routes
 * @param routes
 * @param authenticator
 * @param routeConfiguration
 * @param extraProps
 * @param switchProps
 */
export const renderRoutes = (
    routes: SpringReactRouteConfig[],
    authenticator: AppRouterAuthenticator<any>,
    routeConfiguration: RouteConfiguration,
    extraProps = {},
    switchProps: SwitchProps = {}) =>
    routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => {
                const {requiredAuth, key, path, exact, strict, component, condition} = route as PrivateRouteProps;
                const needAuth = requiredAuth == null ? routeConfiguration.requiredAuth : requiredAuth;
                return needAuth ?
                    <DefaultPrivateRoute
                        authenticator={authenticator}
                        component={component}
                        loginView={routeConfiguration.loginView}
                        noPermissionView={routeConfiguration.noPermissionView}
                        extraProps={extraProps}
                        path={path}
                        exact={exact}
                        strict={strict}
                        condition={condition}
                        key={key || i}/> :
                    <Route key={key || i}
                           path={path}
                           exact={exact}
                           strict={strict}
                           render={(props: any) => (
                               <route.component {...props} {...extraProps} route={route}/>
                           )}
                    />
            })}
        </Switch>
    ) : null;


