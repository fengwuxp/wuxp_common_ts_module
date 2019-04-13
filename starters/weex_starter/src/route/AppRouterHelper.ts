import AppRouter from "./AppRouter";
import {AppRouterHelper,RouteViewParams} from "common_route/src/helper/AppRouterHelper";


class WeexAppRouterHelper implements AppRouterHelper {


    toView = (pathname: string, viewPrams?: RouteViewParams) => {
        return AppRouter.toView({
            pathname,
            ...(viewPrams || {})
        });
    };

    redirectView = this.toView;


    backView = () => AppRouter.back() as Promise<void>;
}

export default new WeexAppRouterHelper();