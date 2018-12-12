import {LocationDescriptorObject} from "history";

/**
 * 导航器适配器
 */
export interface NavigatorAdapter<T extends LocationDescriptorObject = LocationDescriptorObject> {


    /**
     * 到某个页面
     * @param params
     */
    push: (params: T) => void | Promise<any>;


    /**
     * 重定向到某个页面
     */
    redirect: (params: T) => void | Promise<any>;

    /**
     * 返回
     * @param num
     */
    goBack: (num?: number, ...args) => void | Promise<any>;

    /**
     * 前进
     */
    goForward?: () => void | Promise<any>;

}
