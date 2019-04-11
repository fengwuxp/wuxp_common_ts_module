import {NavigatorAdapter, NavigatorDescriptorObject} from "common_route/src/NavigatorAdapter";
import {parse, stringify} from "querystring";
import {handleRedirect} from "common_route/src/utils/RedirectRouteUtil";
import TaroJsHolder, {TaroInterfaceHolder} from "../TaroJsHolder";


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
        // const paths = pathname ? pathname.split("?") : [];
        const result = handleRedirect(this, {
            pathname,
            queryParams: {
                // ...(parse(paths[0])),
                ...parse(search),
                ...(queryParams || {}),
            },
            state
        });
        if (result != null) {
            //需要重定向
            return result as Promise<void>;
        }

        return this.taroHolder.taro.navigateTo({
            url: this.generateURL(params)
        });

    };

    redirect = (params: NavigatorDescriptorObject): Promise<void> => {
        return this.taroHolder.taro.redirectTo({
            url: this.generateURL(params)
        });
    };


    protected generateURL = (navigatorDescriptorObject: NavigatorDescriptorObject): string => {


        const {pathname, state, search} = navigatorDescriptorObject;

        const paths = pathname.split("?");

        const params = {
            ...(parse(search as string) || {}),
            // ...(parse(paths[0])),
            ...(state || {})
        };

        let url = `/${this.prefix}${paths[0].startsWith("/") ? "" : "/"}${paths[0]}`;

        if (Object.keys(params).length > 0) {
            url = `${url}?${stringify(params)}`;
        }


        // console.debug("--url-->", url);

        return url;
    }

}
