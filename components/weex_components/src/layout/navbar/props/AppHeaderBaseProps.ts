import {enableImmersiveNavBar} from "../../../condition/EnableImmersiveNavBar";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";

const navBarOptions = AppConfigRegistry.getNavBarOptions();

const appHeaderBaseProps = {


    /**
     * 返回图标
     */
    backIcon: {
        default: navBarOptions.backIcon
    },

    /**
     * 返回图标样式
     */
    backIconStyle: {
        default: navBarOptions.backIconStyle || {
            width: "80px",
            height: "80px"
        }
    },

    navTitle: {
        default: null
    },

    /**
     * 背景图
     */
    backgroundImage: {
        default: navBarOptions.backgroundImage
    },

    /**
     * 沉浸式导航栏颜色
     */
    immersiveStatusBarColor: {
        default: navBarOptions.immersiveStatusBarColor
    },

    /**
     * 沉浸式导航栏高度
     */
    immersiveStatusBarHeight: {
        default: 0
    },

    /**
     * 是否开启沉浸式导航栏
     */
    enableImmersive: {
        default: enableImmersiveNavBar()
    },

    /**
     * 样式
     */
    style: {
        default: navBarOptions.style || {}
    },

    /**
     * 左侧样式
     */
    leftStyle: {
        default: navBarOptions.leftStyle || {
            height: 100,
            width: 120
        }
    },

    /**
     * 中间样式
     */
    centerStyle: {
        default: navBarOptions.centerStyle
    },
    /**
     * 右侧样式
     */
    rightStyle: {
        default: navBarOptions.rightStyle
    }
};

export default appHeaderBaseProps;
