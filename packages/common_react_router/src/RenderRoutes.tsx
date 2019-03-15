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
            {routes.map((route, i) => {
                const {requiredAuth, key, path, exact, strict, component} = route as any;
                const needAuth = requiredAuth == null ? globalRouterRouteConfig.requiredAuth : requiredAuth;
                return needAuth ?
                    <DefaultPrivateRoute
                        authenticator={authenticator}
                        toLoginViewPathname={globalRouterRouteConfig.toLoginViewPathname}
                        component={component}
                        extraProps={extraProps}
                        path={path}
                        exact={exact}
                        strict={strict}
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


