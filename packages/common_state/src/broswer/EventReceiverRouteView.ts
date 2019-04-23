import {EventReceiverOptions} from "../annotations/BrowserEventReceiver";


export interface EventReceiverRouteViewOptions extends EventReceiverOptions {

}

/**
 * 路由页面
 */
export type EventReceiverRouteView<T> = (options: EventReceiverRouteViewOptions) => T;