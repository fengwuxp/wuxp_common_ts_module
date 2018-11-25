import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
import WeexNavigatorAdapter from "common_weex/src/route/WeexNavigatorAdapter";
import {WeexRouteItem} from "./WeexRouteItem";
import {NavigatorParam} from "common_route/src/NavigatorAdapter";
import {isWeb} from "common_weex/src/constant/WeexEnv";
import {getWeexResourceUrl} from "../../../../packages/common_weex/src/resources/ResourcePathParser";


const navigator: NavigatorAdapter = new WeexNavigatorAdapter();


interface AppRoute {
    [key: string]: WeexRouteItem;
}

/**
 * 应用路由者
 */
export default class AppRouter {

    private static appRoutes: AppRoute = {};

    /**
     * 注册路由列表
     * @param appRoutes
     */
    static registerRouters = (appRoutes: AppRoute) => {
        AppRouter.appRoutes = appRoutes;
    };

    //这个方法需要具体的项目区实现
    static generateBundleJsURL: (uri: string) => string;


    static toView = (param: NavigatorParam) => {

        //转化
        if (!isWeb) {
            const route: WeexRouteItem = AppRouter.appRoutes[param.pathname];
            if (route == null) {
                return;
            }

            //拼接完整的url
            const pathname = `${AppRouter.generateBundleJsURL(route.component as string)}`;

            navigator.push({
                ...param,
                pathname
            });
        } else {
            navigator.push(param);
        }
    };

    static back = navigator.goBack;


}