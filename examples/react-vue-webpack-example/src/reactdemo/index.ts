import {Home} from "./Home";
import {RouteConfig} from "react-router-config";
import asyncComponent from "./AsyncComponent";



const routes: Array<RouteConfig> = [
    {
        path: "/login",
        exact: true,
        //重写文件名称
        component: asyncComponent(() => import( /* webpackChunkName: "sample/[name]-[hash]" */ "./views/LoginView"))
    },
    {
        path: "/register",
        exact: true,
        component: asyncComponent(() => import("./views/RegisterView"))
    },
    {
        path: "/",
        component: Home
    },
];


export default routes;
