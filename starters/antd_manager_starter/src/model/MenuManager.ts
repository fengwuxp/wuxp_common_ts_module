/**
 * 通用菜单定义
 */
export interface CommonMenuItem<T extends CommonMenuItem = CommonMenuItem<any>> {

    /**
     * 菜单唯一标识
     */
    key: string;

    /**
     * 上级key
     */
    parentKey: string;

    /**
     * 菜单名称
     */
    name: string;

    /**
     * 路径
     */
    path: string;

    /**
     * 菜单类型
     */
    type?: MenuType;

    /**
     * 菜单点击类型
     */
    menuActionType?: MenuActionType;

    /**
     * 是否启用
     */
    enabled?: boolean;

    /**
     * 显示类型
     */
    showType?: MenuShowType;

    /**
     * 图标
     */
    icon?: string;

    /**
     * 下级菜单
     */
    children?: Array<T>;

    /**
     * 层级
     */
    level: number;


}

/**
 * 菜单类型
 */
export enum MenuType {

    /**
     * hover弹出菜单
     * @type {string}
     */
    HOVER_POP = "HOVER_POP",

    /**
     * 抽屉式菜单
     * @type {string}
     */
    DRAWER = "DRAWER",

    /**
     * 默认菜单
     * @type {string}
     */
    DEFAULT = "DEFAULT"
}

/**
 * 菜单动作
 */
export enum MenuActionType {

    /**
     * 显示下级菜单
     */
    SHOW_SUB_MENU = "SHOW_SUB_MENU",

    /**
     * 在当前打开页面
     * @type {string}
     */
    OPEN_LINK_DEFAULT = "OPEN_LINK_DEFAULT",

    /**
     * 在新窗口打开页面
     * @type {string}
     */
    OPEN_LINK_BLANK = "OPEN_LINK_BLANK",

    /**
     * 关闭当前
     * @type {string}
     */
    CLOSE_CURRENT = "CLOSE_CURRENT",

    /**
     * 弹出对话框
     * @type {string}
     */
    POP_DIALOG = "POP_DIALOG",

    /**
     * 弹出页面
     * @type {string}
     */
    POP_PLAN = "POP_PLAN",

    /**
     * 执行js脚本
     * @type {string}
     */
    EXECUTE_JS_SCRIPT = "EXECUTE_JS_SCRIPT"
}

/**
 * 菜单显示类型
 */
export enum MenuShowType {


    /**
     * 强制显示
     * @type {string}
     */
    FORCIBLY = "FORCIBLY",


    /**
     * 仅在有权限的时候显示
     * @type {string}
     */
    ONLY_AUTH = "ONLY_AUTH",

    /**
     * 自定义
     * @type {string}
     */
    CUSTOM = "CUSTOM",

    /**
     * 继承上级菜单
     * @type {string}
     */
    EXTENDS = "EXTENDS"
}

