import {Redirect, Route} from "react-router";
import * as React from "react";
import {PrivateRoute, PrivateRouteProps} from "./PrivateRoute";
import {ConditionRouteRender} from "./ConditionRouteRender";


/**
 * 默认的私有的路由，需要登录
 * @param props
 * @constructor
 */
const DefaultPrivateRoute: PrivateRoute = (props: PrivateRouteProps) => {
    const {
        authenticator,
        path,
        exact,
        strict,
        loginView,
        noPermissionView,
        extraProps,
        condition
    } = props;

    return (
        <Route path={path}
               exact={exact}
               strict={strict}
               render={(routeProps) => (
                   authenticator.isAuthenticated() ? (<ConditionRouteRender condition={condition}
                                                                            noPermissionView={noPermissionView}
                                                                       children={<props.component {...routeProps} {...extraProps} />}/>) : (
                       <Redirect to={{
                           pathname: loginView == null ? "/login" : loginView.startsWith("/") ? loginView : `/${loginView}`,
                           state: {
                               from: props.location
                           }
                       }}/>
                   )
               )}/>
    );
};

export default DefaultPrivateRoute;