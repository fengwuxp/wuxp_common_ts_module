import AppRouter from "./AppRouter";
import {AppRouterHelper} from "common_route/src/helper/AppRouterHelper";


class WeexAppRouterHelper implements AppRouterHelper {


    toView = (pathname: string, viewPrams?: ViewParams) => {
        return AppRouter.toView({
            pathname,
            ...(viewPrams || {})
        });
    };

    redirectView = this.toView;


    backView = () => AppRouter.back();
}

export default new WeexAppRouterHelper();