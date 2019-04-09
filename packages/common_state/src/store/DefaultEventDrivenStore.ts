import AbstractEventDrivenStore from "./EventDrivenStore";
import {EventPayload} from "../Payload";


export default class DefaultEventDrivenStore<T extends EventPayload=EventPayload> extends AbstractEventDrivenStore<T>{


    constructor() {
        super();
    }
}