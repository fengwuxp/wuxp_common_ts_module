import {NamedRouteConfig} from "fengwuxp_common_react/src/route/NamedRouteConfig";


export function buildRouteNames<T>(routes: NamedRouteConfig[]): T {

    const routeNames: T = {} as T;

    routes.forEach((item) => {
        let path = item.path;
        routeNames[path.substring(1, path.length)] = path;
    });

    return routeNames;
}