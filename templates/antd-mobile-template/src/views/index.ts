import {NamedRouteConfig} from "common_react/src/route/NamedRouteConfig"
import IndexNavView from "./IndexNavView";
import {ErrorMessage, ErrorView, NotFoundView} from "./exception/CommonException";
import LoginView from "./account/LoginView";
import RegisterView from "./account/RegisterView";
import {buildRouteNames} from "../utils/CommonUtil";
import memberRoutes from "./member/";


interface IndexRouteNames {

    login: string;

    register: string

    404: string;

    500: string;

    error_message: string

}

const routes: Array<NamedRouteConfig> = [


    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/register',
        component: RegisterView
    },

    ...memberRoutes,

    {
        path: "/404",
        exact: true,
        component: NotFoundView
    },
    {
        path: "/500",
        exact: true,
        component: ErrorView
    },
    {
        path: "/error_message",
        exact: true,
        component: ErrorMessage
    },
    {
        path: '/',
        component: IndexNavView
    }
];

export const indexRouteName: IndexRouteNames = buildRouteNames(routes);


export default routes;
