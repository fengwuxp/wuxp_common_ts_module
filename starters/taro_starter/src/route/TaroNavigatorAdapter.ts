import {NavigatorAdapter, NavigatorDescriptorObject} from "fengwuxp_common_route/src/NavigatorAdapter";
import {parse, stringify} from "querystring";
import {handleRedirect} from "fengwuxp_common_route/src/utils/RedirectRouteUtil";
import TaroJsHolder, {TaroInterfaceHolder} from "../TaroJsHolder";
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

    protected taroHolder: TaroInterfaceHolder;

    constructor(prefix: string = "pages") {
        this.prefix = prefix;
        this.taroHolder = TaroJsHolder.getTaroHolder();
    }

    goBack = (num?: number): Promise<void> => this.taroHolder.taro.navigateBack({delta: num});


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
        return this.taroHolder.taro.navigateTo({
            url,
        });

    };

    redirect = (params: NavigatorDescriptorObject): Promise<void> => {
        const url = this.generateURL(params);
        setNextViewState(params.state);
        return this.taroHolder.taro.redirectTo({
            url
        });
    };

    switchTab = (pathname: string) => {
        const url = this.generateURL({
            pathname
        });
        this.taroHolder.taro.switchTab({
            url
        });
    };

    reLaunch = (params: NavigatorDescriptorObject): Promise<void> => {
        const url = this.generateURL(params);
        setNextViewState(params.state);
        return this.taroHolder.taro.reLaunch({
            url
        });
    };

    protected generateURL = (navigatorDescriptorObject: NavigatorDescriptorObject): string => {


        const {pathname, search, queryParams} = navigatorDescriptorObject;

        const paths = pathname.split("?");

        const params = {
            // ...(parse(search as string) || {}),
            ...(parse(paths[1] || "") || {}),
            ...(queryParams || {})
        };

        let url = paths[0];
        if (!url.startsWith(this.prefix) && !url.startsWith(`/${this.prefix}`)) {
            //没有包含前缀
            url = url.startsWith("/") ? `${this.prefix}${url}` : `${this.prefix}/${url}`;
        }
        url = url.startsWith("/") ? url : `/${url}`;

        if (Object.keys(params).length > 0) {
            url = `${url}?${stringify(params)}`;
        }


        console.log("--url-->", url);

        return url;
    }

}
