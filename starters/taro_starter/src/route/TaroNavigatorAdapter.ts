import {NavigatorAdapter, NavigatorDescriptorObject} from "common_route/src/NavigatorAdapter";
import {parse, stringify} from "querystring";
import {handleRedirect} from "common_route/src/utils/RedirectRouteUtil";


/**
 * 基于京东taro的导航适配器
 * 原本的提供的不好用
 */
export class TaroNavigatorAdapter implements NavigatorAdapter {


    private prefix: string;


    protected taro: any;

    constructor(taro: any, prefix: string = "pages") {
        this.taro = taro;
        this.prefix = prefix;
    }

    goBack = (num?: number): Promise<void> => this.taro.navigateBack({delta: num});


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

        return this.taro.navigateTo({
            url: this.generateURL(params)
        });

    };

    redirect = (params: NavigatorDescriptorObject): Promise<void> => {
        return this.taro.redirectTo({
            url: this.generateURL(params)
        });
    };


    protected generateURL = (navigatorDescriptorObject: NavigatorDescriptorObject): string => {


        const {pathname, state, search} = navigatorDescriptorObject;

        const paths = pathname.split("?");

        const params = {
            ...(parse(search as string)),
            // ...(parse(paths[0])),
            ...(state || {})
        };

        let url = `/${this.prefix}${paths[0].startsWith("/") ? "" : "/"}${paths[0]}`;

        if (params != null) {
            url = `${url}?${stringify(params)}`;
        }


        // console.debug("--url-->", url);

        return url;
    }

}
