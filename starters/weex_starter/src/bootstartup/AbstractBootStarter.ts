import appConfigRegistry, {AppConfigRegistry} from "common_config/src/app/AppConfigRegistry";
import {AppConfig} from "common_config/src/app/AppConfig";
import AppRouter from "../route/AppRouter";

import weexDefaultSessionManager from "../session/WeexDefaultSessionManager";
import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";


//约定导入 app配置
// @ts-ignore
import {appConfig} from '../../../../src/config/WeexAppConfig';
//约定导入 路由配置
// @ts-ignore
import route from '../../../../src/route/NavtieRoute';
import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";


export interface WeexAppContext {

    /**
     * APP router
     */
    appRouter: AppRouter;

    /**
     * app 配置
     */
    appConfig: AppConfig;

    /**
     * app 配置注册器
     */
    appRegistry: AppConfigRegistry;

}

/**
 * 抽象的 boot startup 启动器
 */
export default abstract class AbstractBootStarter<T extends WeexAppContext> implements AppBootStarter<T> {

    protected static appContext: WeexAppContext = null;


    abstract startup: (...args) => (void | Promise<T>);


    protected baseStartup = (...args): Promise<T> => {
        if (AbstractBootStarter.appContext == null) {
            //初始化app 配置
            appConfigRegistry.register(appConfig);

            //注册路由
            AppRouter.registerRouters(route);

            AppRouter.appSessionManager = weexDefaultSessionManager;

            AbstractBootStarter.appContext = {
                appRouter: AppRouter,
                appRegistry: appConfigRegistry,
                appConfig
            }
        }


        return Promise.resolve(AbstractBootStarter.appContext as any);
    };

}


