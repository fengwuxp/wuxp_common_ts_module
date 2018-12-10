// @ts-ignore
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
// @ts-ignore
import {AppConfig} from "common_config/src/app/AppConfig";
//约定导入 app配置
// @ts-ignore
import {appConfig} from '../../../../src/config/WeexAppConfig';
//约定导入 路由配置
// @ts-ignore
import route from '../../../../src/route/NavtieRoute';
import AppRouter from "../route/AppRouter";

import simpleAppSessionManager from "../session/SimpleAppSessionManager";
import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";
import {Registry} from "common_core/src/registry/Registry";


export interface WeexAppContext {

    appRouter: AppRouter;

    appConfig: AppConfig;

    appRegistry: Registry<AppConfig>
}

/**
 * 抽象的 boot startup 启动器
 */
export default abstract class AbstractBootStarter<T extends WeexAppContext> implements AppBootStarter<T> {

    protected static appContext: WeexAppContext = null;


    startup = (...args): Promise<T> => {
        if (AbstractBootStarter.appContext == null) {
            //初始化app 配置
            AppConfigRegistry.register(appConfig);

            //注册路由
            AppRouter.registerRouters(route);

            AppRouter.appSessionManager = simpleAppSessionManager;

            AbstractBootStarter.appContext = {
                appRouter: AppRouter,
                appRegistry: AppConfigRegistry,
                appConfig
            }
        }


        return Promise.resolve(AbstractBootStarter.appContext as any);
    };

}


