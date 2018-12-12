import {NavigatorAdapter} from "../../NavigatorAdapter";
import {History, LocationDescriptorObject} from "history";

/**
 * 浏览器导航适配器
 */
export default class BrowserNavigatorAdapter implements NavigatorAdapter {


    protected history: History;


    constructor(history: History) {
        this.history = history;
    }

    goBack: (num?: number, ...args) => void;

    goForward: () => void;

    push: (params: LocationDescriptorObject) => (void | Promise<void>);

    redirect: (params: LocationDescriptorObject) => (void | Promise<void>);


}

