import * as React from "react";
import {RouteLayout, RouteLayoutProps} from "./RouteLayout";
import Layout from "antd/es/layout/layout";
import {ContainerQuery} from "react-container-query";
import {Query} from "react-container-query/src/interfaces";
import SidebarMenu from "../components/sidebar/SidebarMenu";

const {Header, Footer, Sider, Content} = Layout;



interface DefaultRouteLayoutProps extends RouteLayoutProps {

    /**
     * 是否支持媒体查询
     * 默认:true
     */
    supportMediaQuery?: boolean;
}

interface DefaultRouteLayoutState {

}

//媒体查询
const MediaQuery: Query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    }
};

/**
 * 默认路由布局器
 * 布局结构: 左右结构，左侧为菜单，右侧为上下结构，右侧顶部为导航栏，其他为页面主体
 *
 * @author wxup
 * @create 2018-09-05 15:47
 **/
export default class DefaultRouteLayout extends React.Component<DefaultRouteLayoutProps, DefaultRouteLayoutState> implements
    RouteLayout<DefaultRouteLayoutProps, DefaultRouteLayoutState> {


    static defaultProps = {
        supportMediaQuery: true
    };


    constructor(props: DefaultRouteLayoutProps, context: any) {
        super(props, context);
    }

    state: DefaultRouteLayoutState = {};

    componentDidMount(): void {
    }

    render() {


        const {supportMediaQuery} = this.props;


        const View = <Layout>
            <SidebarMenu logo={""} siteName={""} menus={[]}/>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>;

        if (supportMediaQuery) {
            //支持媒体查询
            return <ContainerQuery query={MediaQuery} children={params => View}/>
        }


        return View;
    }


}
