import * as React from "react";
import DocumentTitle from "react-document-title";
import {renderRoutes} from "react-router-config";
import {ReduxRouterProps} from "fengwuxp_common_redux/src/props/ReduxRouterProps";
import {NamedRouteConfig} from "fengwuxp_common_react/src/route/NamedRouteConfig";


interface BaseLayoutProps extends ReduxRouterProps {

    /**
     * 路由列表
     */
    routes: NamedRouteConfig[];

    /**
     * 站点名称
     */
    siteName: string;

}

export default class BaseLayout extends React.Component<BaseLayoutProps, any> {


    render() {

        const {routes, location} = this.props;
        const pathname = location.pathname;

        return <DocumentTitle title={this.getPageTitle(pathname, routes)}>
            {renderRoutes(routes)}
        </DocumentTitle>
    }


    /**
     * 根据路由获取视图名称
     * @param {string} pathname
     * @param {NamedRouteConfig[]} routes
     * @return {string}
     */
    getPageTitle = (pathname: string, routes: NamedRouteConfig[]): string => {

        const route = routes.find((item) => item.path === pathname);
        if (route == null || route.name == null) {
            return ""
        }

        return route.name
    }
}
