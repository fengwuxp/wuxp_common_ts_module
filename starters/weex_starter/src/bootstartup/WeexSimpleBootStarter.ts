import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {AppConfig} from "common_config/src/app/AppConfig";
//约定导入 app配置
import {appConfig} from '../../../../src/config/WeexAppConfig';
//约定导入 路由配置
import route from '../../../../src/route/NavtieRoute';
import AppRouter from "../route/AppRouter";
import simpleAppSessionManager from "../session/SimpleAppSessionManager";
import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";


interface WeexAppContext {

    router: AppRouter;

    appRegistry: AppConfigRegistry;

    appConfig: AppConfig
}

/**
 * boot startup 启动
 */
class WeexSimpleBootStarter implements AppBootStarter<WeexAppContext> {

    startup = (...args): Promise<WeexAppContext> => {
        //初始化app 配置
        AppConfigRegistry.register(appConfig);
        let packageName: string = weex.config.env['appGroup'];
        if (packageName == null || packageName.trim().length === 0) {
            packageName = weex.config.env.appName;
        }

        //注册路由
        AppRouter.registerRouters(route);


        AppRouter.appSessionManager = simpleAppSessionManager;

        AppRouter.generateBundleJsURL = function (uri: string, main: boolean) {

            return `weex://${packageName}/${main ? 'main' : 'page'}/${uri}`;
        };

        return Promise.resolve({
            router: AppRouter,
            appRegistry: AppConfigRegistry,
            appConfig
        });
    };

}

const weexSimpleBootStarter = new WeexSimpleBootStarter();
export default weexSimpleBootStarter;

