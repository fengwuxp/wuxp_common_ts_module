import {WeexModule} from "weex";


/**
 * 广播模块
 */
export interface WeexBoradcastModule extends WeexModule {

    register: (category: string,
               eventName: string,
               succFn: (data) => void,
               errorFn?: (data) => void,) => void;

    send: (category: string,
           eventName: string,
           data,
           error?) => void;

    unregister: (category: string, eventName: string) => void;
}
