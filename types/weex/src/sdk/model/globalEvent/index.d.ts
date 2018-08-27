import {WeexModule} from "../../../../index";

/**
 * 全局事件
 * https://weex.apache.org/cn/references/modules/globalevent.html
 */
export interface WeexGlobalEventModule extends WeexModule{

    /**
     * 添加一个事件监听
     * @param {string} eventName 事件名称
     * @param {Function} callback
     */
    readonly  addEventListener: (eventName: string, callback: (data?: any) => void) => void;

    /**
     * 移除事件监听
     * @param {string} eventName 事件名称
     */
    readonly removeEventListener: (eventName: string) => void;
}
