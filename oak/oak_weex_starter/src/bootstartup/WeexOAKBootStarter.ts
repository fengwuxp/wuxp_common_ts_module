// @ts-ignore
import AbstractBootStarter, {WeexAppContext} from "weex_starter/src/bootstartup/AbstractBootStarter";
// @ts-ignore
import DefaultFetchFeignProxyInitializer, {FetchFeignProxyInitializer} from "weex_starter/src/fetch/FetchFeignProxyInitializer";


/**
 * weex 自定义的loader
 */
export default class WeexOAKBootStarter extends AbstractBootStarter<WeexAppContext> {

    //feign proxy init
    protected feignProxyInitializer: FetchFeignProxyInitializer;

    protected initStatus: boolean = false;

    startup = (...args): Promise<WeexAppContext> => super.startup(...args).then((context: WeexAppContext) => {

        if (this.initStatus) {
            return context;
        }
        this.initStatus = true;

        if (this.feignProxyInitializer == null) {
            this.feignProxyInitializer = new DefaultFetchFeignProxyInitializer();
        }
        this.feignProxyInitializer.init();

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
            return `weex://${packageName}/${main ? 'main' : 'page'}/${context.appConfig.resourceDomain}/weex/${context.appConfig.resourceConfig.remoteDeploymentDirectory}/${uri}`;
        };


        return context;
    });

}

