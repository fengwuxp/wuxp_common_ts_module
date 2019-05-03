import {SubscriptionHolder} from "../subscription/SubscriptionHolder";
import {Publisher} from "../publishe/Publisher";


/**
 * 主题
 */
export interface Topic<T = any> {


    /**
     * 订阅主题
     * @param  handle 订阅处理者
     * @param  complete 主题被关闭（完成）时的回调
     * @return SubscriptionHolder
     */
    subscribe: (receiver: DefaultReceiver<T>, complete?: () => void) => SubscriptionHolder;


    /**
     * 关闭这个主题
     */
    close: () => void;

    /**
     * 获取一个发布者
     * @return Publisher
     */
    getPublisher: () => Publisher<T>;
}


export type DefaultReceiver<T = any> = (data: T) => void;