import {WeexAudioStandardizedModule} from "./WeexAudioStandardizedModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {natJsAudioModule} from "../../../natjs/media";


/**
 * natjs audio
 */
export interface NatJsAudioStandardizedModule extends WeexAudioStandardizedModule {

}


export const natJsAudioStandardizedModule: WeexAudioStandardizedModule = standardizedWeexModuleToPromise<NatJsAudioStandardizedModule>({
    module: natJsAudioModule,
    transformParamMap: {
        pause: () => {
            return [];
        },
        play: (url: string) => {
            return [url];
        },
        stop: () => {
            return [];
        }
    },
    transformCallbackMap: {
        pause: (resolve, reject) => {
            return [resolve];
        },
        play: (resolve, reject) => {
            return [resolve];
        },
        stop: (resolve, reject) => {
            return [resolve];
        }
    }
});