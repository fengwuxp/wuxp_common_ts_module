import {Redirect, Route} from "react-router";
import * as React from "react";
import {PrivateRoute, PrivateRouteProps} from "./PrivateRoute";


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
        toLoginViewPathname,
        extraProps
    } = props;
    return (
        <Route path={path}
               exact={exact}
               strict={strict}
               render={(routeProps) => (
                   authenticator.isAuthenticated() ? (<props.component {...routeProps} {...extraProps} />) : (
                       <Redirect to={{
                           pathname: toLoginViewPathname == null ? "/login" : toLoginViewPathname.startsWith("/") ? toLoginViewPathname : `/${toLoginViewPathname}`,
                           state: {
                               from: props.location
                           }
                       }}/>
                   )
               )}/>
    );
};

export default DefaultPrivateRoute;