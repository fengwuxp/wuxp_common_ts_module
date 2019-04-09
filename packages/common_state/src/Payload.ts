/**
 * payload
 */
import {BaseEventOptions} from "./store/BaseEventOptions";

export interface Payload<T> {

    /**
     * 传递的值
     */
    value: T;
}


export interface EventPayload<T = any> extends Payload<T> ,BaseEventOptions {


}