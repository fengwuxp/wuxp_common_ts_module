import {WeexNavigatorModule, WeexNavigatorPopOptions, WeexNavigatorPushOptions} from "weex/src/sdk/model/navigator";
import createBrowserHistory from "history/createBrowserHistory";
import {History} from "history";


/**
 * weex web导航器
 */
export class WeexWebNavigatorModule implements WeexNavigatorModule {

    private history: History;


    //默认使用BrowserHistory
    constructor(history?: History) {
        this.history = history || createBrowserHistory();
    }

    readonly pop = (options: WeexNavigatorPopOptions, callback: Function) => {
        this.history.goBack();
        if (callback) {
            callback();
        }
    };

    readonly push = (options: WeexNavigatorPushOptions, callback: Function) => {
        const paths = options.url.split("?");
        this.history.push({
            pathname: paths[0],
            search: paths[1]
        });
        if (callback) {
            callback();
        }
    };


}