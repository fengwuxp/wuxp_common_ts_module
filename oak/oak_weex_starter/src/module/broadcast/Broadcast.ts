import BroadcastPlugin from "oak_common/src/plugins/broadcast/BroadcastPlugin";
import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {WeexBoradcastModule} from "./index";

/**
 * 自定义简单的广播对象 (web模块)
 * Created by wuxp on 2017/5/31.
 */
if (isWeb) {
    const boradcastModule: WeexBoradcastModule = new BroadcastPlugin();
    console.log("注册自定义模块 broadcast");
    weex.registerModule('broadcast', boradcastModule);
}

