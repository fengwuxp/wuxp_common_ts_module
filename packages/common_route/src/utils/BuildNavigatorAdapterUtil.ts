import {NavigatorAdapter} from "../adapter/NavigatorAdapter";
import {RUN_ENV} from "../../../common_env/src/EnvVariable";
import {RunEnv} from "../../../common_env/src/enums/RunEnv";


export default class BuildNavigatorAdapterUtil {


    public static build = (): NavigatorAdapter => {


        let navigatorAdapter;
        switch (RUN_ENV) {
            case RunEnv.WEB:
                navigatorAdapter = require("../adapter/react/BrowserNavigatorAdapter");
                break;
            case RunEnv.WEEX:
                navigatorAdapter = require("../adapter/weex/WeexNavigatorAdapter");
                break;
            case RunEnv.WX_MIN_AAPP:
                navigatorAdapter = require("../adapter/wxminapp/WxMinAppNavigatorAdapter");
                break;
        }
        return new navigatorAdapter.default();

    }
}