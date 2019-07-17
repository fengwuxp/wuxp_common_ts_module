import {WeexVideoStandardizedModule} from "./WeexVideoStandardizedModule";
import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {natJsVideoModule} from "../../../natjs/media";


/**
 * natjs video
 */
export interface NatJsVideoStandardizedModule extends WeexVideoStandardizedModule {

}


export const weexVideoStandardizedModule: WeexVideoStandardizedModule = standardizedWeexModuleToPromise<NatJsVideoStandardizedModule>({
    module: natJsVideoModule,
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