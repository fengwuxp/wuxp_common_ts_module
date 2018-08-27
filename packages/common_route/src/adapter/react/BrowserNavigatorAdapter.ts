import {NavigatorAdapter} from "../NavigatorAdapter";
import {History} from "history";
import HistoryRegistry from "../../registry/HistoryRegistry";

/**
 * 浏览器导航适配器
 */
export default class BrowserNavigatorAdapter implements NavigatorAdapter {


    protected history: History;


    constructor() {
        this.history = HistoryRegistry.get();
    }

    goBack = this.history.goBack;

    push = this.history.push;

    goForward = this.history.goForward


}

