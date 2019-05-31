import {NamedRouteConfig} from "common_react/src/route/NamedRouteConfig"
import IndexView from "./IndexView";
import HomeView from "./HomeView";


interface IndexRouteNames {

    login: string;

    register: string

    404: string;

    500: string;

    error_message: string

}

const routes: Array<NamedRouteConfig> = [
    {
        path: "/home",
        // path: HomeView["pathname"],
        exact: true,
        component: HomeView
    },
    {
        path: "/",
        component: IndexView
    },
];


export default routes;
