import * as React from "react";
import DefaultMenuBuilder from "./DefaultMenuBuilder";
import Menu, {MenuMode, MenuTheme, SelectParam} from "antd/es/menu";
import {SidebarMenuProps} from "./SidebarMenu";


/**
 * 菜单构建者
 */
export interface MenuBuilder {

    /**
     * 构建菜单
     * @param menus
     */
    build: (menus: any) => React.ReactNode;

    /**
     * 获取默认打开的菜单
     * @param menus
     */
    openKeys: (menus: any) => string[];

    /**
     * 获取默认选中的菜单
     * @param menus
     */
    selectedKeys: (menus: any) => string[];


}

export interface BaseMenuProps {

    /**
     * 菜单数组
     */
    menus: any;

    /**
     * 菜单构建者
     */
    menuBuilder?: MenuBuilder;


    /**
     * 菜单样式
     * 默认：dark
     */
    theme?: MenuTheme;

    /**
     * 菜单类型，现在支持垂直、水平、和内嵌模式三种
     * 默认：vertical
     */
    mode?: MenuMode;

    /**
     * 样式
     */
    style?: React.CSSProperties;
}


interface BaseMenuState {

    openKeys: string[];

    selectedKeys: string[];
}

/**
 * base menu
 * @author wxup
 * @create 2018-09-05 17:13
 *
 * 需要有一个构建菜单的构建者
 *
 **/
export default class BaseMenu extends React.PureComponent<BaseMenuProps, BaseMenuState> {

    static defaultProps = {
        menuBuilder: new DefaultMenuBuilder(),
        theme: "dark"
    };


    constructor(props: BaseMenuProps, context?: any) {
        super(props, context);
        const {menuBuilder, menus} = this.props;

        //初始化state
        this.state = {
            openKeys: menuBuilder.openKeys(menus),
            selectedKeys: menuBuilder.selectedKeys(menus)
        };
    }


    // static getDerivedStateFromProps = (props: BaseMenuProps, state) => {
    //
    //     return state;
    // };

    render() {

        const {menuBuilder, menus, theme, mode, style,} = this.props;

        const {openKeys, selectedKeys} = this.state;

        return <Menu
            key="wuxp_antd_base_menu"
            mode={mode}
            theme={theme}
            onOpenChange={this.handleOpenChange}
            onSelect={this.handleOnSelect}
            selectedKeys={selectedKeys}
            style={style}
            openKeys={openKeys}>
            {menuBuilder.build(menus)}
        </Menu>;
    }

    /**
     * 处理菜单打开
     * @param openKeys
     */
    handleOpenChange = (openKeys: string[]) => {
        //排除重复的
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
    };


    /**
     * 处理菜单选中
     */
    handleOnSelect = (param: SelectParam) => {
        this.setState({
            selectedKeys: param.selectedKeys
        });
    };

    /**
     * 是否为主菜单
     * @param key
     */
    private isMainMenu = (key: string) => {
        const {menus} = this.props;
        return menus.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };
}
