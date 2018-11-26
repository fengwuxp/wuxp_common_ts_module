import {AppConfig} from "common_config/src/app/AppConfig";
import {LayoutConfig} from "common_config/src/views/LayoutConfig";
import {ResourceConfig} from "common_config/src/resources/ResourceConfig";
import {NavBarStyleOptions} from "common_config/src/views/LayoutConfig";


const navBarStyleOptions: NavBarStyleOptions = {
    backIcon: "",

    backIconStyle: {},

    backgroundImage: "",

    centerStyle: {},

    immersiveStatusBarColor: "#ffffff",

    leftStyle: {},

    rightStyle: {},

    style: {}

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

    remoteDeploymentDirectory: "",

    versionCode: ""


};

export const appConfig: AppConfig = {

    apiDomain: "",

    httpProtocol: "http",

    layoutConfig,

    resourceConfig,

    resourceDomain: "",

    upLoadFileURL: ""

};