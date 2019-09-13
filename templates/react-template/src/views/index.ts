import {NamedRouteConfig} from "fengwuxp_common_react/src/route/NamedRouteConfig"
import IndexView from "./IndexView";
import HomeView from "./HomeView";
import GoodsListView from "./GoodsListView";
import FunctionView from "./FunctionView";


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
        exact: true,
        component: HomeView
    },
    {
        path: "/goods_list",
        exact: true,
        component: GoodsListView
    },
    {
        path: "/function_view",
        exact: true,
        component: FunctionView
    },
    {
        path: "/",
        component: IndexView
    },
];


export default routes;
