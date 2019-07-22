import ProxyFactory from "fengwuxp_common_proxy/src/ProxyFactory";
import {NavigatorAdapter} from "./NavigatorAdapter";


/**
 * 路由跳转方法
 */
type JumpMethod<P = {
    [key: string]: any
}, S = {
    [key: string]: any
}> = (queryParams: P, state: S) => Promise<void>;

/**
 * 路由控制对象
 */
export interface RouteControlObject {

    [key: string]: JumpMethod;
}


/**
 * 路由控制对象创建者
 *
 * @param routeAdapter 导航适配器
 */
const createControlObject = (routeAdapter: NavigatorAdapter): RouteControlObject => {


    return ProxyFactory.newProxyInstanceEnhance({},
        (object: any, propertyKey: PropertyKey, receiver: any) => {

        }, (object: any, methodName: string, receiver: any) => {

        })
};