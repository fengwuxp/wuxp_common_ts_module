import {ReducerHolder} from "../../src/reducer/ReducerHolder";


export default class TestReducer implements ReducerHolder<any> {


    defaultState: any = {};

    setProps<K extends keyof any>(newState: any, state?: any): void {
    }


    constructorName: string;


    pushUser = (records, state?) => {
        state.users.push(...records);
        return {
            ...state
        };
    };



}
