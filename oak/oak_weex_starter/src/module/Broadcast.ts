import BroadcastPlugin from "oak_weex_common/src/plugins/broadcast/BroadcastPlugin";
import {isWeb} from "common_weex/src/constant/WeexEnv";
import {WeexModule} from "weex";

/**
 * 自定义简单的广播对象 (web模块)
 * Created by wuxp on 2017/5/31.
 */
if (isWeb) {

    const broadcastweex: any = new BroadcastPlugin();
    console.log("注册自定义模块 broadcast");
    weex.registerModule('broadcast', broadcastweex);
}

