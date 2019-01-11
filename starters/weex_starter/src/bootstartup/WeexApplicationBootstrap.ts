import appConfigRegistry from "common_config/src/app/AppConfigRegistry";
import AppRouter from "../route/AppRouter";

import weexDefaultSessionManager from "../session/WeexDefaultSessionManager";
import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";

//约定导入 app配置
// @ts-ignore
import {appConfig} from '../../../../src/config/WeexAppConfig';
//约定导入 路由配置
// @ts-ignore
import route from '../../../../src/route/NavtieRoute';
import {WeexAppContext} from "../config/WeexAppConfig";

/**
 * weex应用的的bootstrap
 */
export default class WeexApplicationBootstrap implements AppBootStarter<WeexAppContext> {

    protected static appContext: WeexAppContext = null;


    protected defaultStarters: AppBootStarter<WeexAppContext>[];


    constructor(defaultStarters: AppBootStarter<WeexAppContext>[]=[]) {
        this.defaultStarters = defaultStarters;
    }

    startup = (...args): Promise<WeexAppContext> => {
        if (WeexApplicationBootstrap.appContext == null) {
            //初始化app 配置
            appConfigRegistry.register(appConfig);
            //注册路由
            AppRouter.registerRouters(route);
            AppRouter.appSessionManager = weexDefaultSessionManager;
            WeexApplicationBootstrap.appContext = {
                appRouter: AppRouter,
                appRegistry: appConfigRegistry,
                appConfig
            };
        } else {
            return Promise.resolve(WeexApplicationBootstrap.appContext);
        }

        const appContext = WeexApplicationBootstrap.appContext;

        //默认的启动器
        const {defaultStarters} = this;

        //启动器列表
        const appStarters = [...defaultStarters, ...(appContext.appConfig.appStarters || [])];

        if (appStarters != null) {
            //执行所有的starter
            appStarters.map((stater) => stater.startup(appContext));
        }

        return Promise.resolve(appContext);

    };


}