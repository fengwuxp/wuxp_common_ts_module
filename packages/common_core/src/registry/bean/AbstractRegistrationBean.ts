import {isNumber, isString} from "util";
import {RegistrationBean} from "./RegistrationBean";


export default abstract class AbstractRegistrationBean<T> implements RegistrationBean<T> {

    protected registerMaps: Map<string | number | any, T> = new Map<string | number | any, T>();

    register = (key: string | number | any, reg: T) => {
        this.registerMaps.set(key, reg)
    };

    forEach = (callback: (handler: T, key: (string | number)) => void) => {
        //TODO 是否做copy
        this.registerMaps.forEach(callback);
    };


    get = (key: string | number | any): T => {

        //TODO 是否做copy
        if (isString(key) || isNumber(key)) {
            return this.registerMaps.get(key);
        }

        let h: T = null;
        this.forEach((handler: T, key: (string | number)) => {
            if (h === null && handler instanceof (key as any)) {
                h = handler;
            }
        });

        return h;
    };


}