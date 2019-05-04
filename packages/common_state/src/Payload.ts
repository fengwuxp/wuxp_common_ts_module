/**
 * payload
 */
export interface Payload<T extends object = object> {


    /**
     * payload type
     */
    type: string;

    /**
     * 传递的值
     */
    value: T;
}


