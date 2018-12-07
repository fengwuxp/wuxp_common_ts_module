import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
import WeexNavigatorAdapter from "common_weex/src/route/WeexNavigatorAdapter";
import {WeexRouteItem} from "./WeexRouteItem";
import {NavigatorParam} from "common_route/src/NavigatorAdapter";
import {parse} from "querystring";
import {AppSessionManager} from "../session/AppSessionManager";
import {ViewConfigByRoute} from "./ViewConfigByRoute";
import {isWeb} from "common_weex/src/constant/WeexEnv";


const navigator: NavigatorAdapter = new WeexNavigatorAdapter();


export interface AppRoute {
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
    static generateBundleJsURL: (uri: string, main: boolean) => string;

    //app的会话管理器,需要注入
    static appSessionManager: AppSessionManager<any>;


    /**
     * to view
     * @param param
     * @param viewConfig
     */
    static async toView(param: NavigatorParam, viewConfig: ViewConfigByRoute = {} as any): Promise<void> {

        let pathname = param.pathname.startsWith("/") ? param.pathname.substr(1, param.pathname.length) : param.pathname;
        const route: WeexRouteItem = AppRouter.appRoutes[pathname];

        if (route == null) {
            console.error("not fount view", pathname);
            return;
        }
        param.state = param.state || {};

        const {meta} = route;
        console.log("-isWeb--", isWeb);


        if (meta) {
            //需要登录
            if (meta.requireAuth) {
                //需要登录,验证是否登录
                const isLogin = await AppRouter.appSessionManager.isLogin();
                if (!isLogin) {
                    //未登录
                    navigator.push({
                        pathname: generateBundleJsURL(AppRouter.appRoutes["lgoin"]),
                        state: {
                            //登录成功的重定向地址
                            redirect: pathname,
                            //重定向参数
                            redirectParam: JSON.stringify({
                                ...parse(param.search),
                                ...param.state
                            })
                        }
                    });
                    return;
                }
            }

            //默认参数
            if (meta.defaultParams) {
                param.state = {
                    ...meta.defaultParams,
                    ...param.state
                }
            }
        }

        if (!isWeb) {
            //拼接完整的url
            pathname = generateBundleJsURL(route);
        }

        //安卓状态栏颜色
        const androidStatusColor = process.env.ANDROID_STATUS_COLOR || viewConfig.androidStatusColor;
        if (!!androidStatusColor) {
            //安卓状态栏颜色
            param.state.statusBarColor = androidStatusColor;
        }

        //跳转
        navigator.push({
            ...param,
            pathname
        });
    };

    static back = navigator.goBack;


}

const generateBundleJsURL = (route) => {
    const {component, meta} = route;
    return `${AppRouter.generateBundleJsURL(component, meta == null ? false : meta.main)}`;
}

