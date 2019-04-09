import {Store} from "../Store";
import DefaultEventDrivenStore from "./DefaultEventDrivenStore";

export default class StoreFactory {


    public static factory = <T extends Store<any>>(): T => {

        return new DefaultEventDrivenStore() as T;
    }
}