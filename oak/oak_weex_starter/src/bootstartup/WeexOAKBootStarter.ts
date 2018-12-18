import AbstractBootStarter, {WeexAppContext} from "weex_starter/src/bootstartup/AbstractBootStarter";
import OAKFetchFeignProxyInitializer from "../fetch/OAKFetchFeignProxyInitializer";
import {getWeexResourceUrl} from "common_weex/src/resources/ResourcePathParser";

//初始化feignProxy
new OAKFetchFeignProxyInitializer().initFeignProxyFactory();

/**
 * weex 自定义的loader
 */
export default class WeexOAKBootStarter extends AbstractBootStarter<WeexAppContext> {


    protected initStatus: boolean = false;

    startup = (...args): Promise<WeexAppContext> => this.baseStartup(...args).then((context: WeexAppContext) => {

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

