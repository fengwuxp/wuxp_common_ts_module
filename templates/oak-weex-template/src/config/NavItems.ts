import {NavItem} from "weex_components/src/layout/tab-bar/NavItem";
import {NavShowType} from "weex_components/src/layout/tab-bar/NavShowType";
import {NavItemType} from "weex_components/src/layout/tab-bar/NavItemType";
import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";


/**
 * 首也底部导航配置
 */
const NAV_ITEMS: Array<NavItem> = [
    {
        icon: getWeexResourceUrl("images/nav/pdj_home.png"),
        text: "首页",
        url: getWeexResourceUrl("HomeView.js?isHome=1"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },
    {
        icon: getWeexResourceUrl("images/nav/pdj_my_category.png"),
        text: "分类",
        url: getWeexResourceUrl("category/CategoryView.js"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },
    {
        icon: getWeexResourceUrl("images/nav/pdj_find.png"),
        text: "发现",
        url: getWeexResourceUrl("find/FindView.js"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },
    {
        icon: getWeexResourceUrl("images/nav/pdj_cart.png"),
        text: "购物车",
        url: getWeexResourceUrl("shopcart/ShopCartView.js?backIconUrl="),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    },

    {
        icon: getWeexResourceUrl("images/nav/pdj_my.png"),
        text: "我的",
        url: getWeexResourceUrl("member/MemberIndexView.js"),
        showType: NavShowType.DEFAULT,
        targetType: NavItemType.VIEW
    }
];

export {
    NAV_ITEMS
}
