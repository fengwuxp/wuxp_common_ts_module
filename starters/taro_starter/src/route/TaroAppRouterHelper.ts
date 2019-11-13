import {TaroNavigatorAdapter} from "./TaroNavigatorAdapter";
import {AppRouterHelper, RouteViewParams} from "fengwuxp_common_route/src/helper/AppRouterHelper";
import {transferViewState} from "./PageStatTransferUtil";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


export interface ViewRouteState<Q = any, S = any, P = any> {

    viewParams: Q,

    viewState: S,

    /**
     * 页面预加载数据
     */
    viewPreload: P
}

class TaroAppRouterHelper implements AppRouterHelper {

    private static DEFAULT_NAVIGATOR: TaroNavigatorAdapter = new TaroNavigatorAdapter();

    private static nativeMap: Map<string, TaroNavigatorAdapter> = new Map<string, TaroNavigatorAdapter>();

    toView = (pathname: string, viewPrams?: RouteViewParams, packageModule?: string) => {

        return TaroAppRouterHelper.getNavigator(packageModule).push({
            pathname,
            ...(viewPrams || {})
        });
    };

    redirectView = (pathname: string, viewPrams?: RouteViewParams, packageModule?: string) => {
        return TaroAppRouterHelper.getNavigator(packageModule).redirect({
            pathname,
            ...(viewPrams || {})
        });
    };

    backView = () => TaroAppRouterHelper.DEFAULT_NAVIGATOR.goBack();


    switchTab = (pathname: string, packageModule?: string) => TaroAppRouterHelper.getNavigator(packageModule).switchTab(pathname);

    reLaunch = (pathname: string, viewPrams?: RouteViewParams, packageModule?: string) => {
        return TaroAppRouterHelper.getNavigator(packageModule).reLaunch({
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
                viewState: viewState == null ? {} as any : viewState
            }
        });
    };

    private static getNavigator = (packageModule?: string) => {
        if (StringUtils.hasText(packageModule)) {
            let taroNavigatorAdapter = TaroAppRouterHelper.nativeMap.get(packageModule);
            if (taroNavigatorAdapter == null) {
                taroNavigatorAdapter = new TaroNavigatorAdapter(`/${packageModule}/pages`);
                TaroAppRouterHelper.nativeMap.set(packageModule, taroNavigatorAdapter);
            }

            return taroNavigatorAdapter
        }

        return TaroAppRouterHelper.DEFAULT_NAVIGATOR;
    }
}

export default new TaroAppRouterHelper();
