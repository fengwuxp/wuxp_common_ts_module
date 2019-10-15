import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {NatJsVideoModule} from "../video/NatJsVideoModule";


if (isWeb) {

    const natJsVideoModule: NatJsVideoModule = {
        pause(callback: () => void) {
            callback();
        },
        play(url: string, callback: () => void) {
            console.log("play video " + url);
            callback();
        },
        stop(callback: () => void) {
            callback();
        }

    };

    console.log("注册自定义模块 video");
    weex.registerModule('video', natJsVideoModule);
}
