import {NavigatorAdapter, NavigatorDescriptorObject} from "common_route/src/NavigatorAdapter";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";
import DefaultURLArgumentsResolve from "../resolve/DefaultURLArgumentsResolve";
import {URLArgumentsResolve} from "../resolve/URLArgumentsResolve";
import {setNextViewState} from "./PageStatTransferUtil";
import {handleRedirect} from "common_route/src/utils/RedirectRouteUtil";
import {parse} from "querystring";


export interface WeexNavigatorParam extends NavigatorDescriptorObject {


    animated?: boolean;

    callback?: () => void;
}

/**
 * weex 导航器适配
 */
export default class WeexNavigatorAdapter implements NavigatorAdapter<WeexNavigatorParam> {

    /**
     * 参数解析器
     */
    protected argumentsResolve: URLArgumentsResolve;

    //获取weex导航器
    protected navigator: WeexNavigatorModule = weex.requireModule("navigator");

    constructor(argumentsResolve?: URLArgumentsResolve, navigator?: WeexNavigatorModule) {
        this.argumentsResolve = argumentsResolve || new DefaultURLArgumentsResolve();
        if (navigator != null) {
            this.navigator = navigator;
        }
    }

    /**
     * 返回
     * @param num
     * @param callback
     */
    goBack = (num?: number, callback?: (...args) => void) => {
        this.navigator.pop({
            animated: "true"
        }, callback);
    };


    /**
     *  push 页面
     * @param params
     */
    push = (params: WeexNavigatorParam): Promise<void> => {

        const {pathname, state, animated, callback} = params;

        const queryParams = params.queryParams || {};
        const result = handleRedirect(this, {
            pathname,
            queryParams,
            state,
            animated,
            callback
        });
        if (result != null) {
            //需要重定向
            return result as Promise<void>;
        }


        const queryString: string = `${this.argumentsResolve.argumentsToString(queryParams)}`;


        //设置需要传递到下一个页面的状态
        setNextViewState(state, pathname);

        let url = pathname;

        if (url.indexOf("?") >= 0) {
            if (url.endsWith("&")) {
                url += queryString;
            } else {
                url += `&${queryString}`;
            }
        } else {
            url += `?${queryString}`;
        }

        return new Promise<void>((resolve, reject) => {
            this.navigator.push({
                url,
                animated: animated == null ? "true" : animated + ""
            }, () => {
                if (!!params.callback) {
                    params.callback();
                }
                resolve();
            });
        })

    };


    redirect = this.push;


}
