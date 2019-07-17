import VueRouter, {RouteConfig} from "vue-router";
import Vue from "vue";
import weexDefaultSessionManager from "../session/WeexDefaultSessionManager";
// @ts-ignore
import routes from '../../../../src/route/WebRoute';
import {AppRoute} from "./AppRouter";
import {WeexRouteItem} from "./WeexRouteItem";
import {Component} from "vue";
import {getRedirectRoute} from "fengwuxp_common_route/src/utils/RedirectRouteUtil";


const routerBasePahth = process.env.ROUTER_BASE_PATH || "";
const ROUTER_BASE_PATH = routerBasePahth.startsWith("/") ? routerBasePahth : `/${routerBasePahth}`;

Vue.use(VueRouter);

//路由列表
const routeList: Array<RouteConfig> = [
    {
        path: `${ROUTER_BASE_PATH}`,
        redirect: {
            path: "/index"
        }
    }
];

/**
 * 设置routeList
 * @param appRoute
 */
const setRouteList = function (appRoute: AppRoute) {
    for (let name in appRoute) {
        const {meta, component}: WeexRouteItem = appRoute[name];
        routeList.push({
            name,
            path: `/${name}`,
            meta,
            component: (component as Component)
        } as any);
    }
};
setRouteList(routes as any);


const router = new VueRouter({
    mode: 'history',
    routes: routeList,
    base: ROUTER_BASE_PATH
});


/**
 * 登陆统一拦截
 */
router.beforeEach(async function (to, from, next) {
    console.log("请求的url->：" + to.path);
    const requireAuth = to.meta.requireAuth;
    console.log("是否需要登陆权限-> " + requireAuth);

    if (requireAuth === undefined || requireAuth === false) {  // 判断该路由是否需要登录权限
        next();
        return;
    }
    try {
        //用户是否已经登陆
        const isLogin = await weexDefaultSessionManager.isLogin();
        if (!isLogin) {
            next({
                path: '/login',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: getRedirectRoute(to.fullPath, to.params)
            });
        } else {
            next();
        }

    } catch (e) {
        next({
            path: '/sysMessage/获取用户登陆出现异常!'
        });
    }


});

export default router;
