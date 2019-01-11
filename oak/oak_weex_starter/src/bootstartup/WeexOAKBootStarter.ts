import AbstractBootStarter, {WeexAppContext} from "weex_starter/src/bootstartup/AbstractBootStarter";
import OAKFetchFeignProxyInitializer from "../fetch/OAKFetchFeignProxyInitializer";
import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";
import AppRouter from "weex_starter/src/route/AppRouter";
import WeexNavigatorAdapter from "common_weex/src/route/WeexNavigatorAdapter";
import {isIos} from "common_weex/src/constant/WeexEnv";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";


const navigator: WeexNavigatorModule = isIos ? weex.requireModule("nav") : weex.requireModule("navigator");

//初始化自定义的路由导航
AppRouter.navigator = new WeexNavigatorAdapter(null, navigator);

/**
 * weex 自定义的loader
 */
export default class WeexOAKBootStarter extends AbstractBootStarter<WeexAppContext> {


    protected initStatus: boolean = false;

    startup = (...args): Promise<WeexAppContext> => this.baseStartup(...args).then((context: WeexAppContext) => {


        const appConfig = context.appConfig;
        if (appConfig.feignProxyInitializer == null) {
            //默认的初始化feignProxy
            new OAKFetchFeignProxyInitializer().initFeignProxyFactory();
        } else {
            //使用自定义的代理初始化器，初始化
            appConfig.feignProxyInitializer.initFeignProxyFactory();
        }


        if (this.initStatus) {
            return context;
        }
        this.initStatus = true;

        let packageName: string = weex.config.env['appGroup'];
        if (packageName == null || packageName.trim().length === 0) {
            packageName = weex.config.env.appName;
        }

        //额外初始化动作
        /**
         * 自定义的生成bundle js url的方式
         * @param uri
         * @param main 是否为主页
         */
        // @ts-ignore
        context.appRouter.generateBundleJsURL = (uri: string, main: boolean) => {

            //自定义的
            return `weex://${packageName}/${main ? 'main' : 'page'}/${getWeexResourceUrl(uri)}`;
        };


        return context;
    });

}

