import {SubscriptionEventType} from "../enums/SubscriptionEventType";


export interface BaseEventOptions {

    /**
     * 事件类型
     * 默认使用SubscriptionEventType.ROUTE
     */
    eventType?: string | SubscriptionEventType;

    /**
     * 事件名称
     * eventType=SubscriptionEventType.ROUTE时，默认使用当前pathname
     */
    eventName?: string;
}

//是否为浏览器环境
const isBrowser = typeof location != "undefined";

export const genEventName = <T extends BaseEventOptions>(options: T) => {

    if (options.eventType === SubscriptionEventType.CUSTOMIZED_EVENT) {

        return options.eventName;
    } else if (options.eventType === SubscriptionEventType.GLOBAL) {

        return "__global__event__";
    } else {
        if (isBrowser) {
            return location.pathname;
        }
    }
};