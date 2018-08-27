import {ReducerHandler} from "../../src/reducer/ReducerHandler";


export default class TestReducer implements ReducerHandler<any> {


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