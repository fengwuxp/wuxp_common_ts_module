import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";
import AppRouter from "weex_starter/src/route/AppRouter";
import {isIos} from "common_weex/src/constant/WeexEnv";
import WeexNavigatorAdapter from "common_weex/src/route/WeexNavigatorAdapter";
import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";
import {WeexAppContext} from "weex_starter/src/config/WeexAppConfig";
import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";

const navigator: WeexNavigatorModule = isIos ? weex.requireModule("nav") : weex.requireModule("navigator");

//重新设置导航器自定义的路由导航
AppRouter.navigator = new WeexNavigatorAdapter(null, navigator);

/**
 * 用于初始路由模块
 */
export default class OAKInitAppRouterBootStarter implements AppBootStarter<WeexAppContext> {

    async startup(context): Promise<WeexAppContext> {

        //获取包名
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

            //自定义的url生成器
            return `weex://${packageName}/${main ? 'main' : 'page'}/${getWeexResourceUrl(uri)}`;
        };
        return context;
    };


}