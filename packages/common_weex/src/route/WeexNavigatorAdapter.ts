import {NavigatorAdapter} from "common_route/src/NavigatorAdapter";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";
import DefaultURLArgumentsResolve from "../resolve/DefaultURLArgumentsResolve";
import {LocationDescriptorObject} from "history";
import {URLArgumentsResolve} from "../resolve/URLArgumentsResolve";
import {setNextViewState} from "./PageStatTransferUtil";


export interface WeexNavigatorParam extends LocationDescriptorObject {

    //查询参数
    queryParams?: {
        [k: string]: any
    };

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


        let {pathname, search, queryParams, state} = params;

        setNextViewState(state);

        let queryString = `${this.argumentsResolve.argumentsToString(queryParams || {})}${search || ''}`;


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
            this.navigator.push({
                url: pathname,
                animated: params.animated == null ? "true" : params.animated + ""
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
