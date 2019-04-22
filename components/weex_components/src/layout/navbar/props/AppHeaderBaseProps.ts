import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {NavBarStyleOptions} from "common_config/src/views/LayoutConfig";
import CommonThemeControl from "common_style/src/CommonThemeControl";


/**
 * 为了保证navBarOptions 不为空 使用抛出一个方法
 */
export const getAppHeaderBaseProps = () => {

    const navBarOptions = AppConfigRegistry.getNavBarOptions() || {} as NavBarStyleOptions;
    const navBarHeight = 100;//CommonThemeControl.getStyleAttrByName("nav-bar-height");
    return {


        /**
         * 返回图标
         */
        backIcon: {
            default: navBarOptions.backIcon || "",
            type: String
        },

        /**
         * 返回图标样式
         */
        backIconStyle: {
            default: () => (navBarOptions.backIconStyle || {
                width: "80px",
                height: "80px"
            }),
            type: Object
        },

        navTitle: {
            default: null,
            type: String
        },

        /**
         * 背景图
         */
        backgroundImage: {
            default: typeof navBarOptions.backgroundImage === "function" ? navBarOptions.backgroundImage() : navBarOptions.backgroundImage,
            type: String
        },

        /**
         * 样式
         */
        navBarStyle: {
            default: () => ({
                height: `${navBarHeight}px`
            }),
            type: Object
        },

        /**
         * 左侧样式
         */
        leftStyle: {
            default: () => (navBarOptions.leftStyle || {
                height: `${navBarHeight}px`,
                width: "120px"
            }),
            type: Object
        },

        /**
         * 中间样式
         */
        centerStyle: {
            default: () => (navBarOptions.centerStyle),
            type: Object
        },

        navTitleStyle: {
            default: () => (navBarOptions.navTitleStyle),
            type: Object
        },
        /**
         * 右侧样式
         */
        rightStyle: {
            default: () => (navBarOptions.rightStyle),
            type: Object
        }
    };

};

