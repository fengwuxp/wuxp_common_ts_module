import {TaroNavigatorAdapter} from "./TaroNavigatorAdapter";
import TaroJsHolder from "../TaroJsHolder";
import {AppRouterHelper, RouteViewParams} from "common_route/src/helper/AppRouterHelper";


class TaroAppRouterHelper implements AppRouterHelper {

    private static navigator: TaroNavigatorAdapter = new TaroNavigatorAdapter();

    toView = (pathname: string, viewPrams?: RouteViewParams) => {
        return TaroAppRouterHelper.navigator.push({
            pathname,
            ...(viewPrams || {})
        });
    };

    redirectView = (pathname: string, viewPrams?: RouteViewParams) => {
        return TaroAppRouterHelper.navigator.redirect({
            pathname,
            ...(viewPrams || {})
        });
    };

    backView = () => TaroAppRouterHelper.navigator.goBack();
}

export default new TaroAppRouterHelper();