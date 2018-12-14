import {NavigatorAdapter} from "../../NavigatorAdapter";
import {LocationDescriptorObject} from "history";
import {parse, stringify} from "querystring";

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

    goBack = (num?: number) => this.taro.navigateBack({delta: num});


    push = (params: LocationDescriptorObject): Promise<void> => {


        return this.taro.navigateTo({
            url: this.generateURL(params)
        });

    };

    redirect = (params: LocationDescriptorObject) => {
        return this.taro.redirectTo({
            url: this.generateURL(params)
        });
    };


    protected generateURL = (locationDescriptorObject: LocationDescriptorObject): string => {


        const {pathname, state, search} = locationDescriptorObject;

        const paths = pathname ? pathname.split("?") : [];

        const params = {
            ...(parse(search as string)),
            ...(parse(paths[0])),
            ...(state || {})
        };

        let url = `/${this.prefix}${paths[0].startsWith("/") ? "" : "/"}${paths[0]}`;

        if (params != null) {
            url = `${url}?${stringify(params)}`;
        }


        console.debug("--url-->", url);

        return url;
    }

}
