import {NavigatorAdapter, NavigatorDescriptorObject} from "common_route/src/NavigatorAdapter";
import {parse, stringify} from "querystring";
import {handleRedirect} from "common_route/src/utils/RedirectRouteUtil";
import TaroJsHolder, {TaroInterface, TaroInterfaceHolder} from "../TaroJsHolder";
import {setNextViewState} from "./PageStatTransferUtil";


/**
 * 基于京东taro的导航适配器
 * 原本的提供的不好用
 */
export class TaroNavigatorAdapter implements NavigatorAdapter {


    /**
     * 页面前缀
     */
    private prefix: string;

    protected taroInstance: TaroInterface;

    constructor(prefix: string = "pages") {
        this.prefix = prefix;
        this.taroInstance = TaroJsHolder.getTaroHolder().taro;
    }

    goBack = (num?: number): Promise<void> => this.taroInstance.navigateBack({delta: num});


    push = (params: NavigatorDescriptorObject): Promise<void> => {

        const {pathname, state, queryParams, search} = params;
        const paths = pathname ? pathname.split("?") : [];
        const needRedirect = handleRedirect(this, {
            pathname,
            queryParams: {
                ...(parse(paths[1] || "") || {}),
                // ...parse(search),
                ...(queryParams || {}),
            },
            state
        });
        if (needRedirect != null) {
            //需要重定向
            return needRedirect as Promise<void>;
        }

        const url = this.generateURL(params);
        setNextViewState(state);
        return this.taroInstance.navigateTo({
            url,
        });

    };

    redirect = (params: NavigatorDescriptorObject): Promise<void> => {
        const url = this.generateURL(params);
        setNextViewState(params.state);
        return this.taroInstance.redirectTo({
            url
        });
    };

    switchTab(pathname: string,) {
        const url = this.generateURL({
            pathname
        });
        return this.taroInstance.switchTab({
            url
        });
    }


    protected generateURL = (navigatorDescriptorObject: NavigatorDescriptorObject): string => {


        const {pathname, search, queryParams} = navigatorDescriptorObject;

        const paths = pathname.split("?");

        const params = {
            // ...(parse(search as string) || {}),
            ...(parse(paths[1] || "") || {}),
            ...(queryParams || {})
        };

        let url = `/${this.prefix}${paths[0].startsWith("/") ? "" : "/"}${paths[0]}`;

        if (Object.keys(params).length > 0) {
            url = `${url}?${stringify(params)}`;
        }


        console.debug("--url-->", url);

        return url;
    }

}
