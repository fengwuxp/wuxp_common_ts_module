import {Reducer} from "redux";
import {ReduxAction} from "../action/ReduxAction";
import {isArray, isObject} from "rxjs/internal-compatibility";
import {ReducerHolder} from "./ReducerHolder";


export const DEFAULT_UPDATE_KEY = "setProps";

/**
 * reducer 工厂
 * 根据 ReducerHandler 创建reducer
 */
export default class ReducerFactory {


    /**
     * 创建一个reducer
     * @param holder
     */
    public static create<S>(holder: ReducerHolder<S>): Reducer<S> {

        let defaultState = holder.defaultState || null;

        const constructorName = holder.constructor.name;

        return (state: S = defaultState, action: ReduxAction<S>): S => {

            const {type, payload} = action;

            if (!type.startsWith(`${constructorName}.`)) {
                //不是该reducer处理的事件类型
                return state;
            }


            const handleName = type.split(".")[1];

            if (handleName !== DEFAULT_UPDATE_KEY) {
                //自定义reducer处理
                return holder[handleName](payload, state);
            }

            //setProps处理
            if (payload == null) {
                return null;
            }

            //合并新旧state
            if (isArray(state)) {
                return Object.assign(state, payload);
            } else if (isObject(state)) {
                return {
                    ...(state as any),
                    ...payload
                };
            } else {
                return payload;
            }
        };
    }
}
