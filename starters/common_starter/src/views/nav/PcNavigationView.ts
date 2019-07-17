import {AppView} from "fengwuxp_common_view/src/AppView";

/**
 * pc端的导航页面
 */
export interface PcNavigationView<T> extends AppView<T> {

    /**
     * 打开关闭导航菜单
     * @param toggle
     */
    toggleNavMenu: (toggle: boolean) => void;


    /**
     * 加载菜单
     * @param args
     */
    loadMenuList: (...args) => any;
}