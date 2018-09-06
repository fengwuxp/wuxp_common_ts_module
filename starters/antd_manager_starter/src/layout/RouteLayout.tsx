import * as React from "react";
import {NamedRouteConfig} from "common_react/src/route/NamedRouteConfig";
import DocumentTitle from "react-document-title";

export interface BasicLayoutProps {

    /**
     * 路由列表
     */
    routes: NamedRouteConfig[];

    /**
     * 站点名称
     */
    siteName: string;

    /**
     * 路由布局器组件
     */
    layout: RouteLayout;

    /**
     * location
     */
    location?: Location;
}

export interface BaseLayoutState {

}

export interface RouteLayoutProps extends BasicLayoutProps {

}

/**
 * 路由布局器组件
 */
export interface RouteLayout<P extends BasicLayoutProps = BasicLayoutProps, S = any> extends React.Component<P, any> {

}

/**
 * 路由布局器
 * 期望目标：灵活的配置主页的布局，可以做到动态切换，例如左右布局，或上下布局
 * 实现思路：主题布局功能有外部注入的组件实现，这里只是定义接口
 */
export default class BasicLayout extends React.Component<BasicLayoutProps, BaseLayoutState> {


    render() {

        const {routes, layout, location} = this.props;
        const pathname = location.pathname;
        const C: any = layout;

        return <DocumentTitle title={this.getPageTitle(pathname, routes)}>
            <C {...this.props}/>
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

