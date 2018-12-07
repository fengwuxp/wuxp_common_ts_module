import {AppConfig} from "common_config/src/app/AppConfig";
import {LayoutConfig} from "common_config/src/views/LayoutConfig";
import {ResourceConfig} from "common_config/src/resources/ResourceConfig";
import {NavBarStyleOptions} from "common_config/src/views/LayoutConfig";


const navBarStyleOptions: NavBarStyleOptions = {

    /**
     * 支持配置字体图标和图标地址
     * 如果是字体图标则配置的是字体图标的名字
     * 字体图标库：https://oblador.github.io/react-native-vector-icons/
     * 默认使用的字体图标类型：Feather
     * 默认使用的字体图标名称: chevron-left
     */
    backIcon: "chevron-left",

    backIconStyle: {
        fontSize: "64px",
        fontWeight: 500,
        color: "#ffffff"
    },

    /**
     * 如果需要背景图则设置
     */
    backgroundImage: null,


    centerStyle: {},

    navTitleStyle: {
        fontSize: 36,
        color: "#ffffff",
        fontWeight: 500,
    },


    immersiveStatusBarColor: "#ffffff",

    leftStyle: {},

    rightStyle: {},

    style: {
        backgroundColor: "#ff2b3c"
    }

};

const layoutConfig: LayoutConfig = {

    bodyStyle: {},

    navBarStyleOptions,

    style: {},

    viewBackgroundColor: "#f6f6f6",

    viewBackgroundImage: ""


};

const resourceConfig: ResourceConfig = {

    iosProjectName: "",

    remoteDeploymentDirectory: "templates",

    versionCode: ""


};

export const appConfig: AppConfig = {

    apiDomain: "",

    httpProtocol: "http",

    layoutConfig,

    resourceConfig,

    resourceDomain: "test.meazoo.com",

    upLoadFileURL: ""

};