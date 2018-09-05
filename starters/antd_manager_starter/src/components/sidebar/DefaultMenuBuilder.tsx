import {MenuBuilder} from "./BaseMenu";
import {CommonMenuItem} from "../../model/MenuManager";
import * as React from "react";
import {Menu} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import styles from "./style.module.less";
import FontAwesome5Icon from "common_web_icons/src/FontAwesome5"

/**
 * 默认的菜单构建者
 * @author wxup
 * @create 2018-09-05 17:22
 **/
export default class DefaultMenuBuilder implements MenuBuilder {

    /**
     * web context 路径
     */
    private webContext: string = process.env.WEB_CONTEXT || "";


    build = (menus: CommonMenuItem[]): React.ReactNode[] => {

        return new SimpleMenu().build(menus);
    };


    openKeys = (menus: CommonMenuItem[]): string[] => {

        //当前uri对应的菜单
        const menuItem = this.findCurrentMenu(menus);

        if (menuItem == null) {
            return [];
        }

        return [menuItem.parentKey];

    };


    selectedKeys = (menus: CommonMenuItem[]): string[] => {

        //当前uri对应的菜单
        const menuItem = this.findCurrentMenu(menus);
        if (menuItem == null) {
            return [];
        }

        return [menuItem.path];

    };


    /**
     * 查找当前菜单
     * @param menus
     */
    private findCurrentMenu = (menus: CommonMenuItem[]): CommonMenuItem => {

        //获取当前路径
        const {pathname} = location;

        const path = pathname.replace(this.webContext, "");

        return menus.find((item) => {

            return item.path === path;
        });
    }
}

class SimpleMenu {

    constructor() {

    }

    public build = (menus: CommonMenuItem[]) => {

        return menus.map((item, index) => {

            return this.renderMenu(item, item.level);
        });
    };

    /**
     * 渲染当前菜单
     * @param menu
     * @param level 菜单成绩
     */
    private renderMenu = (menu: CommonMenuItem, level: number) => {

        const {children, key, name, icon} = menu;
        if (children == null || children.length == 0) {
            //是否有下级菜单

            return <Menu.Item key={key}>{name}</Menu.Item>;
        } else {

            return <SubMenu key={key} title={icon ? <span>{getIcon(icon)}<span>{name}</span></span> : name}>
                {
                    children.map((item) => {

                        return this.renderMenu(item, item.level);
                    })
                }
            </SubMenu>
        }

    };


}


const getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
        return <img src={icon} alt="icon" className={styles.icon}/>;
    }
    if (typeof icon === 'string') {
        return <FontAwesome5Icon size={24} color={"currentColor"} name={icon}/>;
    }
    return icon;
};


