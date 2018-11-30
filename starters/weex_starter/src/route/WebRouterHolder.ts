import VueRouter, {RouteConfig} from "vue-router";
import Vue from "vue";
import simpleAppSessionManager from "../session/SimpleAppSessionManager";
import routes from '../../../../src/route/WebRoute';
import {AppRoute} from "./AppRouter";
import {WeexRouteItem} from "./WeexRouteItem";
import {Component} from "vue";

Vue.use(VueRouter);

//路由列表
const routeList: Array<RouteConfig> = [
    {
        path: '/',
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
        });
    }
};
setRouteList(routes as any);

const router = new VueRouter({
    mode: 'history',
    routes: routeList
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
        const isLogin = await simpleAppSessionManager.isLogin();
        if (!isLogin) {
            next({
                path: '/login',
                query: {
                    // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    redirect: to.fullPath,
                    redirectParam: JSON.stringify(to.params)
                }
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
