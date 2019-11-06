import {Home} from "./Home";
import {RouteConfig} from "react-router-config";
import asyncComponent from "./AsyncComponent";


interface IndexRouteNames {

    login: string;

    register: string

    404: string;

    500: string;

    error_message: string

}


const routes: Array<RouteConfig> = [
    {
        path: "/login",
        exact: true,
        component: asyncComponent(() => import("./views/LoginView"))
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
