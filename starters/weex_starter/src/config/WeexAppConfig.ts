import {AppConfig} from "fengwuxp_common_config/src/app/AppConfig";
import {AppBootStarter} from "fengwuxp_common_starter/src/bootstartup/AppBootStarter";
import AppRouter from "../route/AppRouter";
import {AppConfigRegistry} from "fengwuxp_common_config/src/app/AppConfigRegistry";
import {ResourceConfig} from "../resources/ResourceConfig";

export interface WeexAppContext {

    /**
     * APP router
     */
    appRouter: AppRouter;

    /**
     * app 配置
     */
    appConfig: WeexAppConfig;

    /**
     * app 配置注册器
     */
    appRegistry: AppConfigRegistry;

}

/**
 * weex app config
 */
export interface WeexAppConfig extends AppConfig {


    /**
     *资源配置
     */
    resourceConfig: ResourceConfig;

    /**
     * app 启动器列表
     */
    appStarters?: AppBootStarter<WeexAppContext>[];

}