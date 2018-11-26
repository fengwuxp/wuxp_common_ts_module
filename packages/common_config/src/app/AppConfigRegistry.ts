import {AppConfig} from "./AppConfig";
import {Registry} from "common_core/src/registry/Registry";
import {LayoutConfig, NavBarStyleOptions} from "../views/LayoutConfig";
import {ResourceConfig} from "../resources/ResourceConfig";

/**
 * app 配置注册器
 * @author wxup
 * @create 2018-09-27 21:29
 **/
class AppConfigRegistry implements Registry<AppConfig> {

    private appConfig: AppConfig;

    /**
     * 注册
     */
    register = (appConfig: AppConfig) => {
        this.appConfig = appConfig;
    };


    /**
     * 获取
     */
    get = (): AppConfig => this.appConfig;


    /**
     * 获取布局配置
     */
    getLayoutConfig = (): LayoutConfig => this.appConfig == null ? null : this.appConfig.layoutConfig;

    /**
     * 获取资源配置
     */
    getResourceConfig = (): ResourceConfig => this.appConfig == null ? null : this.appConfig.resourceConfig;

    /**
     * 获取导航栏配置
     */
    getNavBarOptions = (): NavBarStyleOptions => this.getLayoutConfig() == null ? null : this.getLayoutConfig().navBarStyleOptions;


}

const appConfigRegistry = new AppConfigRegistry();

export default appConfigRegistry;
