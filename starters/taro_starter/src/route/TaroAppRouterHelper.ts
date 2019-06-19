import {TaroNavigatorAdapter} from "./TaroNavigatorAdapter";
import {AppRouterHelper, RouteViewParams} from "common_route/src/helper/AppRouterHelper";
import {transferViewState} from "./PageStatTransferUtil";


export interface ViewRouteState<Q = any, S = any, P = any> {

    viewParams: Q,

    viewState: S,

    /**
     * 页面预加载数据
     */
    viewPreload: P
}

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


    switchTab = (pathname: string) => TaroAppRouterHelper.navigator.switchTab(pathname);

    reLaunch = (pathname: string, viewPrams?: RouteViewParams) => {
        return TaroAppRouterHelper.navigator.reLaunch({
            pathname,
            ...(viewPrams || {})
        });
    };


    /**
     * 初始化页面状态
     * @param viewInstance
     */
    initViewRouteState = <Q = any, S = any, P = any, T = any>(viewInstance: any): Promise<ViewRouteState<Q, S, P>> => {

        return transferViewState().then((viewState: S) => {

            return {
                viewParams: viewInstance.$router.params,
                viewPreload: viewInstance.$router.preload,
                viewState
            }
        });
    };

}

export default new TaroAppRouterHelper();