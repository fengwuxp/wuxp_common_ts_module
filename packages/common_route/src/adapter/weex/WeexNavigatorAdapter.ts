import {NavigatorAdapter, NavigatorParam} from "../NavigatorAdapter";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";
import URLArgumentsResolve from "../../resolve/URLArgumentsResolve";


export const DEFAULT_PARAM_KEY_NAME: string = "p_hex";

//weex固定参数
export const FIXED_PARAM_KEYS: string[] = JSON.parse(process.env.FIXED_PARAM_KEYS) || [
    "weex_refresh",
    "isCanBack"
];

const navigator: WeexNavigatorModule = weex.requireModule('navigator');

/**
 * 参数解析
 */
export const argumentsResolve = new URLArgumentsResolve(DEFAULT_PARAM_KEY_NAME, FIXED_PARAM_KEYS);


/**
 * weex 导航器适配
 */
export default class WeexNavigatorAdapter implements NavigatorAdapter {

    goBack = (num?: number, callback?: (...args) => void) => {
        navigator.pop({
            animated: "true"
        }, callback);
    };


    push = (params: NavigatorParam) => {

        let {pathname, search, state} = params;

        let queryString = `${argumentsResolve.argumentsToString(state || {})}${search || ''}`;

        if (pathname.indexOf("?") >= 0) {
            if (pathname.endsWith("&")) {
                pathname += queryString;
            } else {
                pathname += `&${queryString}`;
            }
        } else {
            pathname += `?${queryString}`;
        }

        navigator.push({
            url: pathname,
            animated: params.animated == null ? "true" : params.animated + ""
        }, params.callback);

    }


}
