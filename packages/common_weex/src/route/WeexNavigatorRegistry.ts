import {Registry} from "common_core/src/registry/Registry";
import {WeexNavigatorModule} from "weex/src/sdk/model/navigator";


/**
 * weex 导航注册器
 */
class WeexNavigatorRegistry implements Registry<WeexNavigatorModule> {

    private navigator: WeexNavigatorModule;

    get = () => this.navigator;


    register = (navigatorModule: WeexNavigatorModule) => {

        this.navigator = navigatorModule;
    };

}

const weexNavigatorRegistry = new WeexNavigatorRegistry();
export default weexNavigatorRegistry;