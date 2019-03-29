/**
 * payload
 */
export interface Payload<T> {

    value: T;
}


export interface EventPayload<T = any> extends Payload<T> {


    eventType: string;

    eventName: string;
}