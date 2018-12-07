import {NavigatorAdapter, NavigatorParam} from "common_route/src/NavigatorAdapter";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";
import URLArgumentsResolve from "../resolve/URLArgumentsResolve";


//获取一个导航
const navigator: WeexNavigatorModule = weex.requireModule("navigator");

/**
 * 参数解析
 */
export const argumentsResolve = new URLArgumentsResolve();


/**
 * weex 导航器适配
 */
export default class WeexNavigatorAdapter implements NavigatorAdapter {

    /**
     * 返回
     * @param num
     * @param callback
     */
    goBack = (num?: number, callback?: (...args) => void) => {
        navigator.pop({
            animated: "true"
        }, callback);
    };


    /**
     *  push 页面
     * @param params
     */
    push = (params: NavigatorParam): Promise<void> => {


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

        return new Promise<void>((resolve, reject) => {
            navigator.push({
                url: pathname,
                animated: params.animated == null ? "true" : params.animated + ""
            }, () => {
                if (!!params.callback) {
                    params.callback();
                    resolve();
                }
            });
        })


    }


}
