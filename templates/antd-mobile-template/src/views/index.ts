import {NamedRouteConfig} from "fengwuxp_common_react/src/route/NamedRouteConfig"
import IndexNavView from "./IndexNavView";
// import {ErrorMessage, ErrorView, NotFoundView} from "./exception/CommonException";
import {buildRouteNames} from "../utils/CommonUtil";


interface IndexRouteNames {

    login: string;

    register: string

    404: string;

    500: string;

    error_message: string

}

const routes: Array<NamedRouteConfig> = [




    // {
    //     path: "/404",
    //     exact: true,
    //     component: NotFoundView
    // },
    // {
    //     path: "/500",
    //     exact: true,
    //     component: ErrorView
    // },
    // {
    //     path: "/error_message",
    //     exact: true,
    //     component: ErrorMessage
    // },
    {
        path: '/',
        component: IndexNavView
    }
];

export const indexRouteName: IndexRouteNames = buildRouteNames(routes);


export default routes;
