import * as React from "react";
import Layout from "antd/es/layout/layout";
import styles from "./style.module.less";
import {Link} from "react-router-dom";
import {SiderProps} from "antd/es/layout";
import BaseMenu from "./BaseMenu";


const {Sider} = Layout;


export interface SidebarMenuProps extends SiderProps {

    /**
     * logo
     */
    logo: string;

    /**
     * 站点名称
     */
    siteName: string;

    /**
     * 菜单
     */
    menus: any;
}

/**
 * 侧边栏菜单
 * @author wxup
 * @create 2018-09-05 16:49
 **/
export default class SidebarMenu extends React.PureComponent<SidebarMenuProps, any> /*implements StaticLifecycle<SidebarMenuProps,any>*/ {

    static defaultProps = {
        width: 256
    };


    constructor(props: SidebarMenuProps, context?: any) {
        super(props, context);
    }





    render() {

        const {width, logo, siteName, menus, collapsed} = this.props;


        return <Sider width={width}>
            {/*logo*/}
            <div className={styles.logo} key="logo" id="logo">
                <Link to="/">
                    <img src={logo} alt="logo"/>
                    <h1>{siteName}</h1>
                </Link>
            </div>
            <BaseMenu
                {...this.props}
                key="Menu"
                menus={menus}
                mode="inline"
                style={{padding: '16px 0', width: '100%'}}
            />
        </Sider>
    }



}
