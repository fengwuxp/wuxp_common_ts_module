import {NavigatorAdapter} from "../../NavigatorAdapter";
import {LocationDescriptorObject} from "history";
import Taro from '@tarojs/taro'
import {parse, stringify} from "querystring";

/**
 * 基于京东taro的导航适配器
 */
export class TaroNavigatorAdapter implements NavigatorAdapter {


    private prefix: string;


    constructor(prefix: string = "pages") {
        this.prefix = prefix;
    }

    goBack = (num?: number) => Taro.navigateBack({delta: num});


    push = (params: LocationDescriptorObject): Promise<void> => {


        return Taro.navigateTo({
            url: this.generateURL(params)
        });

    };

    redirect = (params: LocationDescriptorObject) => {
        return Taro.redirectTo({
            url: this.generateURL(params)
        });
    };


    protected generateURL = (locationDescriptorObject: LocationDescriptorObject): string => {


        const {pathname, state, search} = locationDescriptorObject;

        const paths = pathname.split("?");

        const params = {
            ...(parse(search) || {}),
            ...(parse(paths[0]) || {}),
            ...(state || {})
        };

        let url = `/${this.prefix}${paths[0].startsWith("/") ? "" : "/"}${paths[0]}`;

        if (params != null) {
            url = `${url}?${stringify(params)}`;
        }


        console.log("--url-->", url);

        return url;
    }

}