import {enableImmersiveNavBar} from "../../../condition/EnableImmersiveNavBar";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";

const navBarOptions = AppConfigRegistry.getNavBarOptions();

const appHeaderBaseProps = {


    /**
     * 返回图标
     */
    backIcon: {
        default: navBarOptions.backIcon,
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
        default: navBarOptions.backgroundImage,
        type: String
    },

    /**
     * 沉浸式导航栏颜色
     */
    immersiveStatusBarColor: {
        default: navBarOptions.immersiveStatusBarColor,
        type: String
    },

    /**
     * 沉浸式导航栏高度
     */
    immersiveStatusBarHeight: {
        default: 0,
        type: Number
    },

    /**
     * 是否开启沉浸式导航栏
     */
    enableImmersive: {
        default: enableImmersiveNavBar(),
        type: Boolean
    },

    /**
     * 样式
     */
    navBarStyle: {
        default: ()=>( {}),
        type: Object
    },

    /**
     * 左侧样式
     */
    leftStyle: {
        default:()=>( navBarOptions.leftStyle || {
            height: 100,
            width: 120
        }),
        type: Object
    },

    /**
     * 中间样式
     */
    centerStyle: {
        default: ()=>(navBarOptions.centerStyle),
        type: Object
    },
    /**
     * 右侧样式
     */
    rightStyle: {
        default: ()=>(navBarOptions.rightStyle),
        type: Object
    }
};

export default appHeaderBaseProps;
