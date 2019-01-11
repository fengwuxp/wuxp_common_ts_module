import {AppConfig} from "./AppConfig";
import {Registry} from "common_core/src/registry/Registry";
import {LayoutConfig, NavBarStyleOptions} from "../views/LayoutConfig";


export interface AppConfigRegistry extends Registry<AppConfig> {

    getLayoutConfig: () => LayoutConfig;

    getNavBarOptions: () => NavBarStyleOptions;
}

/**
 * app 配置注册器
 * @author wxup
 * @create 2018-09-27 21:29
 **/
class AppConfigRegistryImpl implements AppConfigRegistry {

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
     * 获取导航栏配置
     */
    getNavBarOptions = (): NavBarStyleOptions => this.getLayoutConfig() == null ? null : this.getLayoutConfig().navBarStyleOptions;


}

const appConfigRegistry = new AppConfigRegistryImpl();

export default appConfigRegistry;
