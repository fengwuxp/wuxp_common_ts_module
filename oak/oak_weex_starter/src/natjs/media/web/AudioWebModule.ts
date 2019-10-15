import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {NatJsAudioModule} from "../audio/NatJsAudioModule";


if (isWeb) {

    const natJsAudioModule: NatJsAudioModule = {
        pause(callback: () => void) {
            callback();
        },
        play(url: string, callback: () => void) {
            console.log("play audio " + url);
            callback();
        },
        stop(callback: () => void) {
            callback();
        }

    };

    console.log("注册自定义模块 audio");
    weex.registerModule('audio', natJsAudioModule);
}
