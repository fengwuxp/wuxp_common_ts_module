import {WeexNavigatorModule, WeexNavigatorPopOptions, WeexNavigatorPushOptions} from "weex/src/sdk/model/navigator";
import {VueRouter} from "vue-router/types/router";
import {parse} from "querystring";


/**
 * weex web导航器
 */
export class WeexWebNavigatorModule implements WeexNavigatorModule {

    private vueRouter: VueRouter;


    //默认使用BrowserHistory
    constructor(router?: VueRouter) {
        this.vueRouter = router;
    }


    // @ts-ignore
    readonly pop = (options: WeexNavigatorPopOptions, callback: Function) => {
        this.vueRouter.back();
        if (callback) {
            callback();
        }
    };

    // @ts-ignore
    readonly push = (options: WeexNavigatorPushOptions, callback: Function) => {
        const paths = options.url.split("?");
        const params = (paths[1] ? parse(paths[1]) : {}) as any;
        const name = paths[0].substr(1, paths[0].length);
        const location = {
            name,
            params
        };
        this.vueRouter.push(location, () => {
            if (callback) {
                callback();
            }
        });

    };

}