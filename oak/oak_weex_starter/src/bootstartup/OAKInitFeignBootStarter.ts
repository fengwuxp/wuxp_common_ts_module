import {WeexAppConfig, WeexAppContext} from "weex_starter/src/config/WeexAppConfig";
import OAKFetchFeignProxyInitializer from "../fetch/OAKFetchFeignProxyInitializer";
import {AppBootStarter} from "fengwuxp_common_starter/src/bootstartup/AppBootStarter";


//默认的初始化feignProxy
new OAKFetchFeignProxyInitializer().initFeignProxyFactory();

/**
 * 用于初始化feign proxy代理
 */
export default class OAKInitFeignBootStarter implements AppBootStarter<WeexAppContext> {


    protected initStatus: boolean = false;

    async startup(context: WeexAppContext): Promise<WeexAppContext> {

        const appConfig: WeexAppConfig = context.appConfig;
        if (appConfig.feignProxyInitializer != null) {
            //使用自定义的代理初始化器，初始化
            appConfig.feignProxyInitializer.initFeignProxyFactory();
        }

        return context;
    }


}

