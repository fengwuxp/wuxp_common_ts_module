import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {AppConfig} from "common_config/src/app/AppConfig";
//约定导入 app配置
import {appConfig} from '../../../../src/config/WeexAppConfig';
//约定导入 路由配置
import route from '../../../../src/route/NavtieRoute';
import AppRouter from "../route/AppRouter";

import simpleAppSessionManager from "../session/SimpleAppSessionManager";
import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";
import {Registry} from "common_core/src/registry/Registry";


interface WeexAppContext {

    appRouter: AppRouter;

    appConfig: AppConfig;

    appRegistry: Registry<AppConfig>
}

/**
 * boot startup 启动
 */
class WeexSimpleBootStarter implements AppBootStarter<WeexAppContext> {

    private static appContext: WeexAppContext = null;

    startup = (...args): Promise<WeexAppContext> => {
        if (WeexSimpleBootStarter.appContext == null) {
            //初始化app 配置
            AppConfigRegistry.register(appConfig);
            let packageName: string = weex.config.env['appGroup'];
            if (packageName == null || packageName.trim().length === 0) {
                packageName = weex.config.env.appName;
            }

            //注册路由
            AppRouter.registerRouters(route);


            AppRouter.appSessionManager = simpleAppSessionManager;

            //自定义的生成bundle js url的方式
            AppRouter.generateBundleJsURL = function (uri: string, main: boolean) {

                //自定义的
                return `weex://${packageName}/${main ? 'main' : 'page'}/${appConfig.resourceDomain}/weex/${appConfig.resourceConfig.remoteDeploymentDirectory}/${uri}`;
            };

            WeexSimpleBootStarter.appContext = {
                appRouter: AppRouter,
                appRegistry: AppConfigRegistry,
                appConfig
            }
        }


        return Promise.resolve(WeexSimpleBootStarter.appContext);
    };

}

const weexSimpleBootStarter = new WeexSimpleBootStarter();
export default weexSimpleBootStarter;

